const express = require("express");
const router = express.Router();
const {
  getOrderList,
  createOrder,
  updateOrder,
  getUserOrderList,
} = require("../controllers/orderController");

router.get("/", getOrderList);
router.post("/create", createOrder);
router.patch("/:id", updateOrder);
router.get("/my", getUserOrderList);

module.exports = router;
