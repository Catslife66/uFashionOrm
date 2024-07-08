const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Cart = sequelize.define(
  "Cart",
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
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Cart.associations = (models) => {
  Cart.belongsTo(models.User, { foreignKey: "user_id" });
  Cart.hasMany(models.CartItem, { foreignKey: "cart_id" });
};

module.exports = Cart;
