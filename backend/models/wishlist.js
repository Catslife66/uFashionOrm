"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      WishList.belongsTo(models.User, { foreignKey: "user_id" });
      WishList.belongsTo(models.ProductSize, { foreignKey: "product_size_id" });
    }
  }
  WishList.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      product_size_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductSize",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "WishList",
    }
  );

  return WishList;
};
