const express = require("express");
const router = express.Router();
const {
  getCart,
  getAllCart,
  updateCart,
  removeCartItem,
} = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", authenticate, getCart);
router.get("/all", getAllCart);
router.post("/", authenticate, updateCart);
router.delete("/:productId", authenticate, removeCartItem);

module.exports = router;
