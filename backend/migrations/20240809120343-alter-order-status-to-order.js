"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Orders_status" ADD VALUE IF NOT EXISTS 'pending';`
    );

    await queryInterface.changeColumn("Orders", "status", {
      type: Sequelize.ENUM("confirmed", "dispatched", "cancelled", "pending"),
      allowNull: false,
      defaultValue: "pending",
    });

    await queryInterface.sequelize.query(
      `UPDATE "Orders" SET "status" = 'pending' WHERE "status" IS NULL;`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Orders", "status", {
      type: Sequelize.ENUM("confirmed", "dispatched", "cancelled"),
      allowNull: true,
    });
  },
};
