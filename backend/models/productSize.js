"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    static associate(models) {
      ProductSize.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductSize.hasMany(models.OrderItem, { foreignKey: "product_size_id" });
      ProductSize.hasMany(models.CartItem, { foreignKey: "product_size_id" });
    }
  }
  ProductSize.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Product",
          key: "id",
        },
      },
      size: {
        type: DataTypes.ENUM,
        values: ["XS", "S", "M", "L", "XL"],
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductSize",
    }
  );
  return ProductSize;
};
