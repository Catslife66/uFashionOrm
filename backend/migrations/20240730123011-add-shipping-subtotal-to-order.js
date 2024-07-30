"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "sub_total", {
      type: Sequelize.DECIMAL(10, 2),
    });
    await queryInterface.addColumn("Orders", "shipping", {
      type: Sequelize.DECIMAL(10, 2),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "sub_total");
    await queryInterface.removeColumn("Orders", "shipping");
  },
};
