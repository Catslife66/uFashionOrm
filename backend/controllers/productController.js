const { Product, Category, ProductImage, Review, User } = require("../models");
const { Op } = require("sequelize");

// get all products
const getProductList = async (req, res) => {
  // const page = parseInt(req.query.page);
  // const limit = parseInt(req.query.limit);
  // const offset = (page - 1) * limit;

  try {
    // const { count, rows } = await Product.findAndCountAll({
    //   limit: limit,
    //   offset: offset,
    //   order: [["createdAt", "DESC"]],
    // });

    // return res.status(200).json({
    //   total: count,
    //   products: rows,
    // });
    const productList = await Product.findAll({
      order: [["updatedAt", "DESC"]],
      include: [{ model: ProductImage }],
    });
    return res.status(200).json(productList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get products by category
const getProductsByCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ where: { slug: slug } });
    if (!category) {
      res.status(404).json({ error: "No categories are found." });
      return;
    }
    const productList = await Product.findAll({
      where: { category_id: category.id },
    });
    return res.status(200).json(productList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get a product
const getProduct = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({
      where: { slug: slug },
      include: [
        { model: Review, include: { model: User } },
        { model: ProductImage },
      ],
    });
    if (product) {
      res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "No such product." });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { prodId } = req.query;
  try {
    const product = await Product.findOne({
      where: { id: prodId },
      include: { model: ProductImage },
    });
    if (product) {
      res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "No such product id." });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// search products
const searchProducts = async (req, res) => {
  const { query } = req.query;

  let productList = [];

  try {
    if (!query) {
      productList = await Product.findAll({
        order: [["updatedAt", "DESC"]],
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          { model: ProductImage },
        ],
      });
      return res.status(200).json(productList);
    }

    if (query === "sale") {
      productList = await Product.findAll({
        where: {
          is_onsales: true,
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          { model: ProductImage },
        ],
        order: [["updatedAt", "DESC"]],
      });
      return res.status(200).json(productList);
    }

    if (query === "new") {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const dateRange = [
        new Date(year, month, 1),
        new Date(year, month + 1, 0),
      ];

      productList = await Product.findAll({
        where: {
          createdAt: { [Op.between]: dateRange },
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          { model: ProductImage },
        ],
        order: [["updatedAt", "DESC"]],
      });
      return res.status(200).json(productList);
    }

    productList = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            "$Category.name$": {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
        { model: ProductImage },
      ],
    });

    return res.status(200).json(productList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// create a product
const createProduct = async (req, res) => {
  const { name, description, origin_price, price, category_id, is_onsales } =
    req.body;
  try {
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ error: "No such category exist." });
    }
    const product = await Product.create({
      name: name.toLowerCase(),
      slug: "",
      description,
      origin_price,
      price,
      category_id,
      is_onsales,
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
    if (!product) {
      return res.status(404).json({ error: "No such product id." });
    }

    await product.update(update);
    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: Category, as: "Category" }],
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(400).json({ error: `The error is ${err.message}` });
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
  getProductsByCategory,
  searchProducts,
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
