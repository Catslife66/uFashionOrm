const {
  User,
  Order,
  OrderItem,
  Product,
  ProductSize,
  ShippingAddress,
  Review,
} = require("../models");
const { Op } = require("sequelize");

// get all orders
const getOrderList = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const status = req.query.status;
  const duration = req.query.duration;
  const offset = (page - 1) * limit;
  const userId = req.user.id;

  let whereClause = {};

  try {
    const user = await User.findByPk(userId);
    if (user.role !== "adminUser" && user.role !== "superUser") {
      whereClause.user_id = user.id;
    }
  } catch (err) {
    return res.status(400).json({
      error: "Unauthenticated users are not allowed to view this content.",
    });
  }

  if (status && status !== "all") {
    whereClause.status = status;
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
      whereClause.createdAt = {
        [Op.between]: dateRange,
      };
    }
  }

  try {
    const { count, rows } = await Order.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    return res.json({
      totalOrders: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      orders: rows,
    });
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
          include: [
            { model: ProductSize, include: { model: Product } },
            { model: Review },
          ],
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

module.exports = {
  createOrder,
  updateOrderStauts,
  getOrderList,
  getOrder,
};
