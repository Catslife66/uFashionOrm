const Product = require("../models/product");
const ProductSize = require("../models/productSize");
const { createProduct } = require("./productController");

// create product size
const createProductSize = async (req, res) => {
  const { product_id, size, stock } = req.body;
  try {
    const product = await Product.findByPk(product_id);
    if (!product) {
      res.status(400).json({ error: "No such product id." });
      return;
    }
    const productSize = await ProductSize.create({ product_id, size, stock });
    return res.status(201).json(productSize);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update product size
const updateProductSize = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const productSize = await ProductSize.findByPk(id);
    if (!productSize) {
      res.status(400).json({ error: "No such product size id." });
      return;
    }
    await productSize.update(update);
    return res.status(200).json(productSize);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createProductSize,
  updateProductSize,
};
