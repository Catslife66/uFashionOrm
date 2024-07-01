const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const slugify = require("slugify");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Category.addHook("beforeSave", (category, options) => {
  if (category.name) {
    category.slug = slugify(category.name, { lower: true });
  }
});

Category.associations = (models) => {
  Category.hasMany(models.Product, { foreignKey: "category_id" });
};

module.exports = Category;
