const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

Product.associations = (models) => {
  Product.belongsTo(models.Category, { foreignKey: "category_id" });
  Product.hasMany(models.ProductSize, { foreignKey: "product_id" });
  Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
  Product.hasMany(models.Review, { foreignKey: "product_id" });
};

module.exports = Product;
