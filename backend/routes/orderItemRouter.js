const express = require("express");
const router = express.Router();
const {
  getOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  getItemsInOrder,
} = require("../controllers/orderItemController");

router.post("/create", createOrderItem);
router.get("/search", getOrderItem);
router.patch("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);
router.get("/:order_id", getItemsInOrder);

module.exports = router;
