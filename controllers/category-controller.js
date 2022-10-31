const db = require("../models");

module.exports = {
  getCategories: async (req, res) => {
    try {
      let allCategories = await db.category.findAll({
        attributes: ["id", "category"],
      });
      console.log("allCategories", allCategories);
      res.status(200).json(allCategories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to get categories" });
    }
  },
};
