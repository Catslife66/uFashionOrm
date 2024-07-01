"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "is_onsales", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
    await queryInterface.addColumn("Products", "sales_price", {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    });
    await queryInterface.addColumn("Products", "slug", {
      type: DataTypes.STRING,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "is_onsales");
    await queryInterface.removeColumn("Products", "sales_price");
    await queryInterface.removeColumn("Products", "slug");
  },
};
