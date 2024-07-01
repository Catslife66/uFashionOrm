const Order = require("../models/order");
const User = require("../models/user");

// get all orders
const getOrderList = async (req, res) => {
  try {
    const orderList = await Order.findAll();
    return res.status(200).json(orderList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get user orders
const getUserOrderList = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(400).json({ error: "You are not logged in." });
    }
    const userOrders = await Order.findAll({ where: { user_id: userId } });
    return res.status(200).json(userOrders);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// create order
const createOrder = async (req, res) => {
  const { user_id, total_amount, status } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(400).json({ error: "User does not exits." });
      return;
    }
    const order = Order.create({ user_id, total_amount, status });
    return res.status(201).json(order);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(400).json({ error: "User does not exits." });
      return;
    }
    await order.update(update);
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrderList,
  getUserOrderList,
};
