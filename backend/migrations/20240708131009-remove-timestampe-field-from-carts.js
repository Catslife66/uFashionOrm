"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Carts", "created_at", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.removeColumn("Carts", "updated_at", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Carts", "created_at");
    await queryInterface.removeColumn("Carts", "updated_at");
  },
};
