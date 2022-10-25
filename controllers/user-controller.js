// const bcrypt = require("bcrypt");

// const userValidator = require("../joi-validators/users");
const db = require("../models");

module.exports = {
  register: async (req, res) => {

    const newUser = {...req.body}

    try {
      await db.user.create(newUser);

      res.status(201).json({ success: "user created" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "failed to register user" });
    }
  },
};
