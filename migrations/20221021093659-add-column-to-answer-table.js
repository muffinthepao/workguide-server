'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('answers', 'imageKitIds', {
      type: Sequelize.TEXT,
    })

  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('answers', 'imageKitIds')
  }
};
