const Cart = require("../models/cart");
const ProductSize = require("../models/productSize");
const CartItem = require("../models/cartItem");

// get all user carts
const getAllCart = async (req, res) => {
  try {
    const cart = await Cart.findAll();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(400).json({ error: `The error is ${err}` });
  }
};

// get user cart
const getCart = async (req, res) => {
  const user = req.user;
  try {
    const cart = await Cart.findOne({
      where: { user_id: user.id },
    });
    if (!cart) {
      return res
        .status(400)
        .json({ error: "You have not created a shopping cart." });
    }
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(400).json({ error: `The error is ${err}` });
  }
};

// create/update shopping cart
const updateCart = async (req, res) => {
  const user = req.user;
  const { productId, size, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ where: { user_id: user.id } });
    if (!cart) {
      cart = await Cart.create({ user_id: user.id });
    }

    const productSizeItem = await ProductSize.findOne({
      where: { product_id: productId, size: size },
    });

    if (!productSizeItem) {
      return res
        .status(404)
        .json({ error: "Related product size stock item is not found." });
    }

    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_size_id: productSizeItem.id },
    });

    if (!cartItem) {
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_size_id: productSizeItem.id,
        quantity: quantity,
      });
    } else {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    return res.status(201).json(cartItem);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  const user = req.user;
  const { productSizeId } = req.body;
  try {
    const cart = await Cart.findOne({ where: { user_id: user.id } });
    const cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_size_id: productSizeId },
    });
    if (!cartItem) {
      res.status(404).json({ error: "This item does not exist in your cart." });
      return;
    } else {
      await cartItem.destroy();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = {
  getCart,
  getAllCart,
  updateCart,
  removeCartItem,
};
