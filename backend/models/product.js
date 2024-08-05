"use strict";
const { Model } = require("sequelize");
const slugify = require("slugify");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.hasMany(models.ProductSize, { foreignKey: "product_id" });
      Product.hasMany(models.ProductImage, { foreignKey: "product_id" });
      Product.hasMany(models.Review, { foreignKey: "product_id" });
    }
  }
  Product.init(
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
      origin_price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      stripe_price: {
        type: DataTypes.INTEGER,
      },
      stripe_product_id: {
        type: DataTypes.STRING,
      },
      stripe_price_id: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  Product.addHook("beforeCreate", (product, options) => {
    if (product.name) {
      product.slug = slugify(product.name, { lower: true });
    }
  });

  Product.addHook("beforeSave", (product, options) => {
    if (product.name) {
      product.slug = slugify(product.name, { lower: true });
    }
  });

  Product.addHook("afterCreate", async (product, options) => {
    try {
      const stripe_product = await stripe.products.create({
        name: product.name,
      });
      product.stripe_product_id = stripe_product.id;

      if (product.price) {
        const stripe_price = await stripe.prices.create({
          product: product.stripe_product_id,
          unit_amount: Math.round(product.price * 100),
          currency: "gbp",
        });
        product.stripe_price_id = stripe_price.id;
        product.stripe_price = stripe_price.unit_amount;
      }

      await Product.update(
        {
          stripe_product_id: product.stripe_product_id,
          stripe_price_id: product.stripe_price_id,
          stripe_price: product.stripe_price,
        },
        {
          where: { id: product.id },
        }
      );
    } catch (error) {
      console.error("Error creating Stripe product or price:", error.message);
    }
  });

  Product.addHook("afterUpdate", async (product, options) => {
    try {
      if (product.changed("price") || !product.stripe_price_id) {
        if (!product.stripe_product_id) {
          const stripe_product = await stripe.products.create({
            name: product.name,
          });
          product.stripe_product_id = stripe_product.id;
        }

        const stripe_price = await stripe.prices.create({
          product: product.stripe_product_id,
          unit_amount: Math.round(product.price * 100),
          currency: "gbp",
        });
        product.stripe_price_id = stripe_price.id;
        product.stripe_price = stripe_price.unit_amount;

        await Product.update(
          {
            stripe_product_id: product.stripe_product_id,
            stripe_price_id: product.stripe_price_id,
            stripe_price: product.stripe_price,
          },
          {
            where: { id: product.id },
          }
        );
      }
      if (product.changed("price") && product.price < product.origin_price) {
        await Product.update(
          { is_onsales: true },
          { where: { id: product.id } }
        );
      }
    } catch (error) {
      console.error("Error updating Stripe product or price:", error.message);
    }
  });

  return Product;
};
