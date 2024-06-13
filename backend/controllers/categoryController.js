const Category = require("../models/category");

// get all categories
const getCategoryList = async (req, res) => {
  try {
    const categoryList = await Category.findAll();
    return res.status(200).json(categoryList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get a category
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      res.status(200).json(category);
    } else {
      return res.status(400).json({ error: "No such category id." });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// create a category
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      category.name = name;
      await category.save();
      res.status(200).json(category);
    } else {
      return res.status(400).json({ error: "No such category id." });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: `${category.name} is deleted.` });
    } else {
      return res.status(400).json({ error: "No such category id." });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getCategoryList,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
