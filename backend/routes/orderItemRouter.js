const express = require("express");
const router = express.Router();
const {
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  getItemsInOrder,
} = require("../controllers/orderItemController");

router.post("/create", createOrderItem);
router.patch("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);
router.get("/:order_id", getItemsInOrder);

module.exports = router;
