const bcrypt = require("bcrypt");

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
        res.status(201).json({ success: "user created" });
      }

      if (!created) {
        res.status(400).json({ success: "user exists" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to create user" });
    }
  },
};
