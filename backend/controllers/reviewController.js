const { Product, User, Review, OrderItem } = require("../models");

// create review
const createReview = async (req, res) => {
  const { user_id, product_id, product_item_id, rating, subject, comment } =
    req.body;
  try {
    const user = await User.findByPk(user_id);
    const product = await Product.findByPk(product_id);
    const productItem = await OrderItem.findByPk(product_item_id);

    if (!user || !product || !productItem) {
      return res.status(400).json({ error: "Foreign key objects error." });
    }
    const review = await Review.create({
      user_id,
      product_id,
      product_item_id,
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
  createReview,
  deleteReview,
};
