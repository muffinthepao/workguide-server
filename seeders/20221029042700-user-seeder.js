"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        fullName: "Mervin Guide 1",
        preferredName: "Guide 1",
        email: "mervin@guide.com",
        role: "guide",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        fullName: "Mervin User 1",
        preferredName: "User 1",
        email: "mervin@user1.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {});
  },
};