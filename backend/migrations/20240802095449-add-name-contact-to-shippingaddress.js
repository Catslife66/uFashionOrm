"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ShippingAddresses", "full_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("ShippingAddresses", "contact_number", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("ShippingAddresses", "full_name");
    await queryInterface.removeColumn("ShippingAddresses", "contact_number");
  },
};
