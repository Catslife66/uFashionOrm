const express = require("express");
const router = express.Router();
const {
  createStrpeCheckOut,
  checkoutSuccess,
} = require("../controllers/paymentController");

router.post("/create-checkout-session", createStrpeCheckOut);
router.get("/success", checkoutSuccess);

module.exports = router;
