"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Product, { foreignKey: "product_id" });
      Review.belongsTo(models.User, { foreignKey: "user_id" });
      Review.belongsTo(models.OrderItem, { foreignKey: "order_item_id" });
    }
  }
  Review.init(
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
        type: DataTypes.STRING,
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
      sequelize,
      modelName: "Review",
    }
  );

  Review.addHook("afterCreate", async (review, options) => {
    await updateProductRating(review.product_id);
  });

  Review.addHook("afterDestroy", async (review, options) => {
    await updateProductRating(review.product_id);
  });

  async function updateProductRating(productId) {
    const { Product, Review } = sequelize.models;
    const result = await Review.findOne({
      where: { product_id: productId },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "avgRating"],
        [sequelize.fn("COUNT", sequelize.col("id")), "ratingCount"],
        [
          sequelize.literal(`COUNT(CASE WHEN rating = 5 THEN 1 END)`),
          "fiveStarCount",
        ],
        [
          sequelize.literal(`COUNT(CASE WHEN rating = 4 THEN 1 END)`),
          "fourStarCount",
        ],
        [
          sequelize.literal(`COUNT(CASE WHEN rating = 3 THEN 1 END)`),
          "threeStarCount",
        ],
        [
          sequelize.literal(`COUNT(CASE WHEN rating = 2 THEN 1 END)`),
          "twoStarCount",
        ],
        [
          sequelize.literal(`COUNT(CASE WHEN rating = 1 THEN 1 END)`),
          "oneStarCount",
        ],
      ],
      raw: true,
    });

    const avgRating = parseFloat(result.avgRating).toFixed(1);
    const ratingCount = parseInt(result.ratingCount, 10) || 0;

    await Product.update(
      {
        average_rating: avgRating,
        rating_count: ratingCount,
        five_star_count: result.fiveStarCount,
        four_star_count: result.fourStarCount,
        three_star_count: result.threeStarCount,
        two_star_count: result.twoStarCount,
        one_star_count: result.oneStarCount,
      },
      { where: { id: productId } }
    );
  }

  return Review;
};
