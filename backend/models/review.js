const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define(
  "Review",
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
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id",
      },
    },
    order_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "OrderItem",
        key: "id",
      },
      unique: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 80,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Review.associations = (models) => {
  Review.belongsTo(models.Product, { foreignKey: "product_id" });
  Review.belongsTo(models.User, { foreignKey: "user_id" });
  Review.belongsTo(models.OrderItem, { foreignKey: "order_item_id" });
};

module.exports = Review;
