const Product = require("../models/product");
const Category = require("../models/category");

// get all products
const getProductList = async (req, res) => {
  try {
    const productList = await Product.findAll();
    return res.status(200).json(productList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get a product
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "No such product id." });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// create a product
const createProduct = async (req, res) => {
  const { name, description, price, category_id } = req.body;
  try {
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ error: "No such category." });
    }
    const product = await Product.create({
      name,
      description,
      price,
      category_id,
    });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.update(update);
      res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "No such product id." });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(200).json({ message: `${product.name} is deleted.` });
    } else {
      return res.status(404).json({ error: "No such product id." });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getProductList,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
