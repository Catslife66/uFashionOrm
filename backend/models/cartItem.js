const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Cart = require("./cart");
const ProductSize = require("./productSize");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cart,
        key: "id",
      },
    },
    product_size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductSize,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

CartItem.associations = (models) => {
  CartItem.belongsTo(models.Cart, { foreignKey: "cart_id" });
  CartItem.belongsTo(models.ProductSize, { foreignKey: "product_size_id" });
};

module.exports = CartItem;
