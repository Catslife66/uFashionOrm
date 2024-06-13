"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reviews", "order_item_id", {
      type: DataTypes.INTEGER,
      references: {
        model: "OrderItems",
        key: "id",
      },
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reviews", "order_item_id");
  },
};
