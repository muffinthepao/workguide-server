"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("answers", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    });

    await queryInterface.changeColumn("answers", "questionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "questions",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("answers", "userId", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.changeColumn("answers", "questionId", {
      type: Sequelize.INTEGER,
    });
  },
};
