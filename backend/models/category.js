"use strict";
const { Model } = require("sequelize");
const slugify = require("slugify");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: "category_id" });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      hooks: {
        beforeCreate: (category, options) => {
          if (category.name) {
            category.slug = slugify(category.name, { lower: true });
          }
        },
      },
      sequelize,
      modelName: "Category",
    }
  );

  Category.addHook("beforeSave", (category, options) => {
    if (category.name) {
      category.slug = slugify(category.name, { lower: true });
    }
  });

  return Category;
};
