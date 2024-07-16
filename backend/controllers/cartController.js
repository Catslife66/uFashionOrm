const { Cart, CartItem, ProductSize, Product } = require("../models");

// get all user carts
// const getAllCart = async (req, res) => {
//   try {
//     const cart = await Cart.findAll();
//     return res.status(200).json(cart);
//   } catch (err) {
//     return res.status(400).json({ error: `The error is ${err}` });
//   }
// };

// get user cart
// const getCart = async (req, res) => {
//   const user = req.user;
//   try {
//     const cart = await Cart.findOne({
//       where: { user_id: user.id },
//     });
//     if (!cart) {
//       return res
//         .status(400)
//         .json({ error: "You have not created a shopping cart." });
//     }
//     return res.status(200).json(cart);
//   } catch (err) {
//     return res.status(400).json({ error: `The error is ${err}` });
//   }
// };

// create or update shopping cart
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
    console.log("productSizeId is " + productSizeItem.id);
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
    return res.status(200).json(cartItem);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateCartItemQty = async (req, res) => {
  const { id, quantity } = req.body;
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      res.status(404).json({ error: "This item does not exist in your cart." });
      return;
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return res.status(200).json(cartItem);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    await cartItem.destroy();
    return res.status(200).json({ id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get items in cart
const getCartItems = async (req, res) => {
  const user = req.user;
  try {
    const cart = await Cart.findOne({
      where: { user_id: user.id },
      include: {
        model: CartItem,
        include: {
          model: ProductSize,
          include: {
            model: Product,
          },
        },
      },
      order: [[CartItem, "updatedAt", "DESC"]],
    });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      res.status(404).json({ error: "This item does not exist in your cart." });
      return;
    }
    return res.status(200).json(cartItem);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  // getCart,
  // getAllCart,
  getCartItems,
  updateCart,
  updateCartItemQty,
  removeCartItem,
  getCartItem,
};
