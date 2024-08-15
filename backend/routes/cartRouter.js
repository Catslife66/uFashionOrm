const express = require("express");
const router = express.Router();
const {
  getCartItems,
  updateCart,
  updateCartItemQty,
  removeCartItem,
  getCartItem,
} = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/mycart", authenticate, getCartItems);
router.post("", authenticate, updateCart); // create_or_update cart
router.post("/update", authenticate, updateCartItemQty);
router.delete("/item/:id", authenticate, removeCartItem);
router.get("/item/:id", authenticate, getCartItem);

module.exports = router;
