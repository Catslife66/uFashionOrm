"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Sequelize, DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductImages", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
      },
      image_url: {
        type: DataTypes.TEXT,
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
    await queryInterface.dropTable("ProductImages");
  },
};
