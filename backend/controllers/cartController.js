const { Cart, CartItem, ProductSize } = require("../models");

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
  console.log({ productId, size, quantity });
  try {
    let cart = await Cart.findOne({ where: { user_id: user.id } });
    if (!cart) {
      cart = await Cart.create({ user_id: user.id });
    }
    console.log("cart is", cart.id);
    const productSizeItem = await ProductSize.findOne({
      where: { product_id: productId, size: size },
    });

    if (!productSizeItem) {
      return res
        .status(404)
        .json({ error: "Related product size stock item is not found." });
    }
    console.log("productSizeItem is", productSizeItem.id);
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
    console.log("cartItem is", cartItem.id);
    return res.status(200).json(cartItem);
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
    return res.status(400).json({ error: err.message });
  }
};

// get items in cart
const getCartItems = async (req, res) => {
  const user = req.user;
  try {
    const cart = await Cart.findOne({
      where: { user_id: user.id },
      include: [{ model: CartItem }],
    });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getCart,
  getAllCart,
  getCartItems,
  updateCart,
  removeCartItem,
};
