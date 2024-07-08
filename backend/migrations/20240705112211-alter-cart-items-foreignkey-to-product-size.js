"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("CartItems", "product_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    });
    await queryInterface.addColumn("CartItems", "product_size_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ProductSizes",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("CartItems", "product_id");
    await queryInterface.removeColumn("CartItems", "product_size_id");
  },
};
