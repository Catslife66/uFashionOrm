const express = require("express");
const router = express.Router();
const {
  createProductSize,
  updateProductSize,
} = require("../controllers/productSizeController");

router.post("/create", createProductSize);
router.patch("/:id", updateProductSize);

module.exports = router;
