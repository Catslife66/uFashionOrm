"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Categories", "slug", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Categories", "slug", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    });
  },
};
