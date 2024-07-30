const { User, Order } = require("../models");

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

// init an order
const createOrder = async (req, res) => {
  const user = req.user;
  const { total_amount } = req.body;
  try {
    if (!user) {
      res.status(400).json({ error: "User does not exits." });
      return;
    }
    const order = Order.create({
      user_id: user.id,
      total_amount: total_amount,
      status: "Pending",
    });
    return res.status(201).json(order);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update order
const updateOrderStauts = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(400).json({ error: "User does not exits." });
      return;
    }
    await order.update({ status: status });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  updateOrderStauts,
  getOrderList,
  getUserOrderList,
};
