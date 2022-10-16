"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "fullName", {
      type: Sequelize.STRING(120),
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "preferredName", {
      type: Sequelize.STRING(120),
      allowNull: false,
    });

    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    });

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "fullName", {
      type: Sequelize.STRING(),
    });

    await queryInterface.changeColumn("users", "preferredName", {
      type: Sequelize.STRING(),
    });

    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
    });
  },
};
