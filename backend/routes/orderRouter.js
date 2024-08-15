const express = require("express");
const router = express.Router();
const {
  getOrderList,
  createOrder,
  updateOrderStauts,
  getOrder,
} = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/:id", authenticate, getOrder);
router.get("", authenticate, getOrderList);
router.post("/create", createOrder);
router.patch("/:id", updateOrderStauts);

module.exports = router;
