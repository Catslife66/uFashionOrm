"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders", "status", {
      type: Sequelize.ENUM,
      values: ["confirmed", "dispatched", "cancelled", "pending"],
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders", "status");
  },
};
