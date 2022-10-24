'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     answerUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "pending"
      },
      shotstackId: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "pending"
      },
      imageKitUrls:{ 
        type: Sequelize.TEXT,
        allowNull: false
      },
      imageKitIds: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("failed", "pending", "completed", "n/a"),
        defaultValue: "pending",
        allowNull: false
      }, 
      answerMethod: {
        type: Sequelize.ENUM("shotstack", "url"),
        defaultValue: "shotstack",
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('answers');
  }
};