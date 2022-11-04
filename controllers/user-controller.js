const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userValidator = require("../joi-validators/users");
const db = require("../models");

module.exports = {
  join: async (req, res) => {
    let errorObject = {};

    const userValidationResults = userValidator.joinValidator.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (userValidationResults.error) {
      const validationError = userValidationResults.error.details;

      validationError.forEach((error) => {
        errorObject[error.context.key] = error.message;
      });

      return res.status(400).json(errorObject);
    }

    const passHash = await bcrypt.hash(req.body.password, 10);
    const newUser = { ...req.body, password: passHash };

    try {
      const [user, created] = await db.user.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          fullName: newUser.fullName,
          preferredName: newUser.preferredName,
          email: newUser.email,
          password: newUser.password,
        },
      });

      // console.log("user: ", user);
      // console.log("newUser: ", newUser);
      // console.log("created: ", created);

      if (created) {
        const userData = {
          id: user.dataValues.id,
          fullName: user.dataValues.fullName,
          preferredName: user.dataValues.preferredName,
          email: user.dataValues.email,
        };

        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
            data: userData,
          },
          process.env.JWT_SECRET
        );

        return res.status(201).json({ userData, token });
      }

      if (!created) {
        return res.status(400).json({ success: "user exists" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to create user" });
    }
  },

  login: async (req, res) => {
    // joi login validations
    let errorObject = {};

    const userValidationResults = userValidator.loginValidator.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (userValidationResults.error) {
      const validationError = userValidationResults.error.details;

      validationError.forEach((error) => {
        errorObject[error.context.key] = error.message;
      });
      return res.status(400).json(errorObject);
    }

    const validatedUser = req.body;

    try {
      const user = await db.user.findOne({
        where: { email: validatedUser.email },
      });

      // return console.log(user.password)

      if (!user) {
        res.status(404).json({ message: "email and password does not match" });
      }

      const isPasswordOk = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordOk) {
        res.status(404).json({ message: "email and password does not match" });
      }

      const userData = {
        fullName: user.fullName,
        preferredName: user.preferredName,
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
          data: userData,
        },
        process.env.JWT_SECRET
      )

      res.status(200).json({ token, userData })
    } catch (error) {}
  },
};
