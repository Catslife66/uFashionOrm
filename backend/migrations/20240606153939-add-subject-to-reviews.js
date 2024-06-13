"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reviews", "subject", {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 80,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reviews", "subject");
  },
};
