"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Product, { foreignKey: "product_id" });
      Review.belongsTo(models.User, { foreignKey: "user_id" });
      Review.belongsTo(models.OrderItem, { foreignKey: "order_item_id" });
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Product",
          key: "id",
        },
      },
      order_item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "OrderItem",
          key: "id",
        },
        unique: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: 80,
        },
      },
      comment: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
