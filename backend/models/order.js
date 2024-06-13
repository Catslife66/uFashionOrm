const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "Order",
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
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Order.associations = (models) => {
  Order.belongsTo(models.User, { foreignKey: "user_id" });
  Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
};

module.exports = Order;
