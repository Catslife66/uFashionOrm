"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "five_star_count", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn("Products", "four_star_count", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn("Products", "three_star_count", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn("Products", "two_star_count", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn("Products", "one_star_count", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "five_star_count");
    await queryInterface.removeColumn("Products", "four_star_count");
    await queryInterface.removeColumn("Products", "three_star_count");
    await queryInterface.removeColumn("Products", "two_star_count");
    await queryInterface.removeColumn("Products", "one_star_count");
  },
};
