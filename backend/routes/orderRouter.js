const express = require("express");
const router = express.Router();
const {
  getOrderList,
  createOrder,
  updateOrderStauts,
  getUserOrderList,
} = require("../controllers/orderController");

router.get("/", getOrderList);
router.post("/create", createOrder);
router.patch("/:id", updateOrderStauts);
router.get("/my", getUserOrderList);

module.exports = router;
