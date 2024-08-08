const express = require("express");
const router = express.Router();
const {
  getOrderList,
  createOrder,
  updateOrderStauts,
  getMyOrderList,
  getOrder,
  filterMyOrders,
} = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/all", authenticate, getOrderList);
router.post("/create", createOrder);
router.get("/filter", authenticate, filterMyOrders);
router.get("/my", authenticate, getMyOrderList);
router.get("/:id", authenticate, getOrder);
router.patch("/:id", updateOrderStauts);

module.exports = router;
