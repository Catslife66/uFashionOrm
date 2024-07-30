"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "user_id" });
      Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
    }
  }
  Order.init(
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
      sub_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      shipping: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 5.0,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
        allowNull: false,
      },
      stripe_checkout_id: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
