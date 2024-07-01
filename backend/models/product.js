const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const slugify = require("slugify");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    is_onsales: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    sales_price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

Product.addHook("beforeSave", (product, options) => {
  if (product.name) {
    product.slug = slugify(product.name, { lower: true });
  }
});

Product.associations = (models) => {
  Product.belongsTo(models.Category, { foreignKey: "category_id" });
  Product.hasMany(models.ProductSize, { foreignKey: "product_id" });
  Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
  Product.hasMany(models.Review, { foreignKey: "product_id" });
};

module.exports = Product;
