const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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

Category.associations = (models) => {
  Category.hasMany(models.Product, { foreignKey: "category_id" });
};

module.exports = Category;
