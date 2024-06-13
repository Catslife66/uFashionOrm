const Product = require("../models/product");
const ProductImage = require("../models/productImage");

// create image
const createImage = async (req, res) => {
  const { product_id, name, image_url } = req.body;
  try {
    const product = await Product.findByPk(product_id);
    if (!product) {
      res.status(400).json({ error: "No such product id." });
      return;
    }
    const productImage = await ProductImage.create({
      product_id,
      name,
      image_url,
    });
    return res.status(201).json(productImage);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update image
const updateImage = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const productImage = await ProductImage.findByPk(id);
    if (!productImage) {
      res.status(404).json({ error: "No such product image id." });
      return;
    }
    await productImage.update(update);
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
  createImage,
  updateImage,
  deleteImage,
};
