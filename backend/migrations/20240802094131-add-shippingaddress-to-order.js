"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "shipping_address_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ShippingAddresses",
        key: "id",
      },
    });
    await queryInterface.changeColumn("Orders", "status", {
      type: Sequelize.ENUM,
      values: ["Confirmed", "Dispatched", "Cancelled", "Pending"],
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "shipping_address_id");
    await queryInterface.changeColumn("Orders", "status");
  },
};
