"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("questionsCategories", "questionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "questions",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.changeColumn("questionsCategories", "categoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "categorys",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("questionsCategories", "questionId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.changeColumn("questionsCategories", "categoryId", {
      type: Sequelize.INTEGER,
    });
  },
};
