const express = require("express");
const router = express.Router();
const {
  getOrderList,
  createOrder,
  updateOrderStauts,
  getMyOrderList,
  getOrder,
} = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", getOrderList);
router.post("/create", createOrder);
router.get("/my", authenticate, getMyOrderList);
router.get("/:id", authenticate, getOrder);
router.patch("/:id", updateOrderStauts);

module.exports = router;
