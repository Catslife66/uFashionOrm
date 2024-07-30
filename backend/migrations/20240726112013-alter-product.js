"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "origin_price", {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0.0,
    });
    await queryInterface.addColumn("Products", "stripe_price", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn("Products", "stripe_product_id", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Products", "stripe_price_id", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("Products", "sales_price");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "origin_price");
    await queryInterface.removeColumn("Products", "stripe_price");
    await queryInterface.removeColumn("Products", "stripe_product_id");
    await queryInterface.removeColumn("Products", "stripe_price_id");
    await queryInterface.addColumn("Products", "sales_price", {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
    });
  },
};
