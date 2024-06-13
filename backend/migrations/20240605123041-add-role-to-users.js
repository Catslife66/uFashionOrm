"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "role", {
      type: Sequelize.ENUM,
      values: ["user", "adminUser", "superUser"],
      allowNull: false,
      defaultValue: "user",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "role");
  },
};
