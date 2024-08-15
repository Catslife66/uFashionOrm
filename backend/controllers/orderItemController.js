const { Order, OrderItem, ProductSize } = require("../models");

// get items in order
const getItemsInOrder = async (req, res) => {
  const { order_id } = req.params;
  try {
    const order = await Order.findByPk(order_id);
    if (!order) {
      res.status(400).json({ error: "Invalid order or product size id." });
      return;
    }
    const orderItemList = await OrderItem.findAll({
      where: { order_id: order_id },
    });
    return res.status(200).json(orderItemList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getOrderItem = async (req, res) => {
  const { id } = req.query;
  try {
    const orderItem = await OrderItem.findOne({
      where: { id: id },
      include: { model: ProductSize },
    });
    if (!orderItem) {
      res.status(404).json({ error: "Order item is not found." });
      return;
    }
    return res.status(200).json(orderItem);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// create order item
const createOrderItem = async (req, res) => {
  const { order_id, product_size_id, quantity, price } = req.body;
  try {
    const order = await Order.findByPk(order_id);
    const productSize = await ProductSize.findByPk(product_size_id);
    if (!order || !productSize) {
      res.status(400).json({ error: "Invalid order or product size id." });
      return;
    }
    const orderItem = await OrderItem.create({
      order_id,
      product_size_id,
      quantity,
      price,
    });
    return res.status(201).json(orderItem);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update order item
const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      res.status(400).json({ error: "Invalid order item id." });
      return;
    }
    await orderItem.update(update);
    return res.status(200).json(orderItem);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// delete order item
const deleteOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      res.status(400).json({ error: "Invalid order item id." });
      return;
    }
    await orderItem.destroy();
    return res.status(200).json({ message: `Order item id ${id} is deleted.` });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  getItemsInOrder,
};
