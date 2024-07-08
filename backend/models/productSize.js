const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProductSize = sequelize.define(
  "ProductSize",
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
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["product_id", "size"],
      },
    ],
  }
);

ProductSize.associations = (models) => {
  ProductSize.belongsTo(models.Product, { foreignKey: "product_id" });
  ProductSize.hasMany(models.OrderItem, { foreignKey: "product_size_id" });
  ProductSize.hasMany(models.CartItem, { foreignKey: "product_size_id" });
};

module.exports = ProductSize;
