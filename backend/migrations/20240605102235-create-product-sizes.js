"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductSizes", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      size: {
        type: DataTypes.ENUM,
        values: ["XS", "S", "M", "L", "XL"],
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductSizes");
  },
};
