const { Product, Review, OrderItem, User } = require("../models");
const review = require("../models/review");

// get reviews by product
const getProductReviews = async (req, res) => {
  const id = req.query.id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Review.findAndCountAll({
      where: { product_id: id },
      include: [{ model: User }],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    return res.status(200).json({ total: count, reviews: rows });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// filter reviews by stars
const filterProductReviews = async (req, res) => {
  const { prodId, rating } = req.query;

  if (!prodId || !rating) {
    return res.status(400).json({ error: "Filter query is incomplete." });
  }

  try {
    const reviews = await Review.findAll({
      where: { product_id: prodId, rating: rating },
      include: [{ model: User }],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get a review
const getReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: "Review is not found." });
    }
    return res.status(200).json(review);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// create review
const createReview = async (req, res) => {
  const user = req.user;
  const { product_id, order_item_id, rating, subject, comment } = req.body;
  try {
    if (
      !user ||
      !product_id ||
      !order_item_id ||
      !rating ||
      !subject ||
      !comment
    ) {
      return res.status(400).json({ error: "All the fields are required." });
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res
        .status(404)
        .json({ error: `Product id ${product_id} is not found.` });
    }

    const order_item = await OrderItem.findByPk(order_item_id);
    if (!order_item) {
      return res
        .status(404)
        .json({ error: `Order item id ${order_item_id} is not found.` });
    }

    const review = await Review.create({
      user_id: user.id,
      product_id,
      order_item_id,
      rating,
      subject,
      comment,
    });
    return res.status(201).json(review);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// delete review
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: "No such product id." });
    }
    await review.destroy();
    res.status(200).json({ message: `Review id ${review.id} is deleted.` });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getProductReviews,
  filterProductReviews,
  getReview,
  createReview,
  deleteReview,
};
