"use strict";
const { Model } = require("sequelize");
const slugify = require("slugify");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.hasMany(models.ProductSize, { foreignKey: "product_id" });
      Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
      Product.hasMany(models.Review, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Category",
          key: "id",
        },
      },
      is_onsales: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      sales_price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  Product.addHook("beforeCreate", (product, options) => {
    if (product.name) {
      product.slug = slugify(product.name, { lower: true });
    }
  });

  Product.addHook("beforeSave", (product, options) => {
    if (product.name) {
      product.slug = slugify(product.name, { lower: true });
    }
  });

  return Product;
};
