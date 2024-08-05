"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ShippingAddresses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      address_line1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_line2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      town_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      county: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "United Kingdom",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ShippingAddresses");
  },
};
