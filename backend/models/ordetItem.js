const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Order",
        key: "id",
      },
    },
    product_size_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ProductSize",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

OrderItem.associations = (models) => {
  OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
  OrderItem.belongsTo(models.ProductSize, { foreignKey: "product_size_id" });
  OrderItem.hasOne(models.Review, { foreignKey: "order_item_id" });
};

module.exports = OrderItem;
