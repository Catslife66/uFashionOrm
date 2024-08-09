const {
  User,
  Order,
  OrderItem,
  Product,
  ProductSize,
  ShippingAddress,
} = require("../models");
const { Op } = require("sequelize");

// get all orders
const getOrderList = async (req, res) => {
  const { status, duration } = req.query;
  const userId = req.user.id;

  let filters = {};

  try {
    const user = await User.findByPk(userId);
    if (user.role !== "adminUser" && user.role !== "superUser") {
      filters.user_id = user.id;
    }
  } catch (err) {
    return res.status(400).json({
      error: "Unauthenticated users are not allowed to view this content.",
    });
  }

  if (status && status !== "all") {
    filters.status = status;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  if (duration && duration !== "all") {
    let dateRange;

    switch (duration) {
      case "this week":
        dateRange = [
          new Date(today.setDate(today.getDate() - today.getDay())),
          new Date(today.setDate(today.getDate() - today.getDay() + 6)),
        ];
        break;
      case "this month":
        dateRange = [new Date(year, month, 1), new Date(year, month + 1, 0)];
        break;
      case "last 3 months":
        dateRange = [new Date(year, month - 3, 1), new Date(year, month, 0)];
        break;
      case "last 6 months":
        dateRange = [new Date(year, month - 6, 1), new Date(year, month, 0)];
        break;
      default:
        dateRange = null;
        break;
    }

    if (dateRange) {
      filters.createdAt = {
        [Op.between]: dateRange,
      };
    }
  }

  try {
    const orderList = await Order.findAll({ where: filters });
    return res.status(200).json(orderList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get user orders
const getMyOrderList = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: "You are not logged in." });
    }
    const userOrders = await Order.findAll({ where: { user_id: userId } });
    return res.status(200).json(userOrders);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get a single order
const getOrder = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const order = await Order.findOne({
      where: { id: id },
      include: [
        {
          model: OrderItem,
          include: { model: ProductSize, include: { model: Product } },
        },
        { model: ShippingAddress },
      ],
    });
    if (!order) {
      return res.status(404).json({ error: "No such order id" });
    }
    if (
      user.role === "adminUser" ||
      user.role === "superUser" ||
      order.user_id === user.id
    ) {
      return res.status(200).json(order);
    }
    return res
      .status(400)
      .json({ error: "Please login to read order details." });
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

// my order filters
const filterMyOrders = async (req, res) => {
  const userId = req.user.id;
  const { status, duration } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Please login to see your orders." });
  }

  let filters = { user_id: userId };

  if (status && status !== "all") {
    filters.status = status;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  let dateRange;

  switch (duration) {
    case "this week":
      dateRange = [
        new Date(today.setDate(today.getDate() - today.getDay())),
        new Date(today.setDate(today.getDate() - today.getDay() + 6)),
      ];
      break;
    case "this month":
      dateRange = [new Date(year, month, 1), new Date(year, month + 1, 0)];
      break;
    case "last 3 months":
      dateRange = [new Date(year, month - 3, 1), new Date(year, month, 0)];
      break;
    case "last 6 months":
      dateRange = [new Date(year, month - 6, 1), new Date(year, month, 0)];
      break;
    default:
      dateRange = null;
      break;
  }

  if (dateRange) {
    filters.createdAt = {
      [Op.between]: dateRange,
    };
  }

  try {
    const orders = await Order.findAll({
      where: filters,
    });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const orderPaginators = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const userId = req.user.id;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Please login to see your orders." });
    }

    const { count, rows } = await Order.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      where: { user_id: userId },
    });

    return res.json({
      totalOrders: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      orders: rows,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrderStauts,
  getOrderList,
  getMyOrderList,
  getOrder,
  filterMyOrders,
};
