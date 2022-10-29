"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        category: "Changing Careers",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Developing Careers",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Diversity & Inclusion",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Employee Benefits",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Exploring Careers",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Finding Jobs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Job Offer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Job Search Resource",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Learning and Growth",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Management & Leadership",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Money Matters",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Productivity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Well-being",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Work Life Balance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Workplace Culture",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Finding a Job",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", nill, {});
  },
};
