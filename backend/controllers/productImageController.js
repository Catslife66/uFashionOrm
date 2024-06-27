const Product = require("../models/product");
const ProductImage = require("../models/productImage");
const path = require("path");
const fs = require("fs");

// get product images
const getProductImages = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(400).json({ error: "No such product id." });
    }
    const imageList = await ProductImage.findAll({
      where: { product_id: productId },
    });
    return res.status(200).json(imageList);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// get a single image
const getSingleImage = async (req, res) => {
  const { id } = req.params;
  try {
    const productImage = await ProductImage.findByPk(id);
    if (!productImage) {
      res.status(404).json({ error: "No such product image id." });
      return;
    }
    return res.status(200).json(productImage);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// create image
const createImage = async (req, res) => {
  const { product_id, name } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }
  try {
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(400).json({ error: "No such product id." });
    }

    const productImage = await ProductImage.create({
      product_id,
      name,
      image_url: `/uploads/${req.file.filename}`,
    });

    return res.status(201).json(productImage);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update image
const updateImage = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const productImage = await ProductImage.findByPk(id);
    if (!productImage) {
      res.status(404).json({ error: "No such product image id." });
      return;
    }
    productImage.name = name;

    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", productImage.image_url);
      console.log("path" + oldImagePath);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      productImage.image_url = `/uploads/${req.file.filename}`;
    }

    await productImage.save();
    return res.status(200).json(productImage);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// delete image
const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    const productImage = await ProductImage.findByPk(id);
    if (!productImage) {
      res.status(404).json({ error: "No such product image id." });
      return;
    }
    await productImage.destroy();
    return res.status(200).json({ message: `Image id ${id} is deleted.` });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getProductImages,
  getSingleImage,
  createImage,
  updateImage,
  deleteImage,
};
