const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProductImage = sequelize.define(
  "ProductImage",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

ProductImage.associations = (models) => {
  ProductImage.belongsTo(models.Product, { foreignKey: "product_id" });
};

module.exports = ProductImage;
