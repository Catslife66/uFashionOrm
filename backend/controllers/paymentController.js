const {
  User,
  Order,
  OrderItem,
  ProductSize,
  Product,
  CartItem,
  Cart,
  ShippingAddress,
} = require("../models");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createStrpeCheckOut = async (req, res) => {
  const { userId, cartItems, cartSubtotal, shipping, shipping_address_id } =
    req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const lineItems = cartItems.map((item) => ({
      price: item.ProductSize.Product.stripe_price_id,
      quantity: item.quantity,
    }));

    if (shipping > 0) {
      lineItems.push({
        price: "price_1Phvx0BdeGX8atnjl1cyVS26", // shipping cost stripe price id
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      customer_email: user.email,
      metadata: {
        userId: user.id,
        cartSubtotal,
        shipping,
        shippingAddressId: shipping_address_id,
      },
      success_url: `${req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    return res.status(201).json(session);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const checkoutSuccess = async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(404).json({ error: "Session ID is required" });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const shippingAddress = await ShippingAddress.findByPk(
      session.metadata.shippingAddressId
    );

    if (!shippingAddress) {
      return res
        .status(404)
        .json({ error: "No matching shipping address is found." });
    }

    let order = await Order.findOne({
      where: { stripe_checkout_id: session.id },
      include: [
        {
          model: OrderItem,
          include: {
            model: ProductSize,
            include: { model: Product },
          },
        },
        {
          model: ShippingAddress,
        },
      ],
    });

    // create order and order items
    if (!order) {
      order = await Order.create({
        user_id: session.metadata.userId,
        shipping: session.metadata.shipping,
        sub_total: session.metadata.cartSubtotal,
        total_amount: session.amount_total / 100,
        status: "confirmed",
        stripe_checkout_id: session.id,
        shipping_address_id: shippingAddress.id,
      });

      const cart = await Cart.findOne({
        where: { user_id: session.metadata.userId },
      });

      const cartItems = await CartItem.findAll({
        where: {
          cart_id: cart.id,
        },
        include: {
          model: ProductSize,
          include: {
            model: Product,
          },
        },
      });

      const orderItemsPromises = cartItems.map(async (item) => {
        await OrderItem.create({
          order_id: order.id,
          product_size_id: item.product_size_id,
          quantity: item.quantity,
          price: item.ProductSize.Product.price,
        });

        // update product stock
        await ProductSize.update(
          {
            stock: item.ProductSize.stock - item.quantity,
          },
          {
            where: { id: item.product_size_id },
          }
        );

        // remove cart item
        await item.destroy();
      });
      await Promise.all(orderItemsPromises);
    }

    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createStrpeCheckOut,
  checkoutSuccess,
};
