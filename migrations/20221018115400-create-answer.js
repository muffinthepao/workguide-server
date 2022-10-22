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
      answerURL: {
        type: Sequelize.TEXT
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
        type: Sequelize.ENUM("failed", "pending", "completed"),
        defaultValue: "pending"
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