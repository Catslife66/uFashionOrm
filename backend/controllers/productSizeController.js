const { Product, ProductSize, ProductImage } = require("../models");

// get product size by product id
const getProductSizesByProduct = async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findByPk(product_id);
    if (!product) {
      res.status(400).json({ error: "No such product id." });
      return;
    }
    const productSizes = await ProductSize.findAll({
      where: { product_id: product_id },
    });
    return res.status(200).json(productSizes);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getProductSizesBySize = async (req, res) => {
  const { prodId, size } = req.params;
  try {
    const productSize = await ProductSize.findOne({
      where: { product_id: prodId, size: size.toUpperCase() },
      include: {
        model: Product,
      },
    });
    return res.status(200).json(productSize);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// create product size
const createProductSize = async (req, res) => {
  const { product_id, size, stock } = req.body;
  try {
    const product = await Product.findByPk(product_id);
    if (!product) {
      res.status(400).json({ error: "No such product id." });
      return;
    }

    const productSize = await ProductSize.create({
      product_id,
      size: size.toUpperCase(),
      stock,
    });
    return res.status(201).json(productSize);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update product size
const updateProductSize = async (req, res) => {
  const { id } = req.params;
  const { product_id, size, stock } = req.body;
  try {
    const productSize = await ProductSize.findByPk(id);
    if (!productSize) {
      res.status(400).json({ error: "No such product size id." });
      return;
    }
    productSize.product_id = product_id;
    productSize.size = size.toUpperCase();
    productSize.stock = stock;
    await productSize.save();
    return res.status(200).json(productSize);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get a product size
const getProductSize = async (req, res) => {
  const { prodId, size } = req.query;
  try {
    if (!prodId || !size) {
      return res
        .status(400)
        .json({ error: "Please provide product id and size" });
    }
    const productSize = await ProductSize.findOne({
      where: { product_id: prodId, size: size },
    });
    if (!productSize) {
      return res.status(404).json({ error: "Product size not found." });
    }
    return res.status(200).json({ prodSizeId: productSize.id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getProductSizesByProduct,
  getProductSizesBySize,
  createProductSize,
  updateProductSize,
  getProductSize,
};
