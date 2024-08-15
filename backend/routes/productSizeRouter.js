const express = require("express");
const router = express.Router();
const {
  validateProductSizeCreate,
  validateProductSizeUpdate,
} = require("../middleware/validateMiddleware");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const {
  getProductSizesByProduct,
  getProductSizesBySize,
  createProductSize,
  updateProductSize,
} = require("../controllers/productSizeController");

router.post(
  "",
  authenticate,
  isAdmin,
  validateProductSizeCreate,
  createProductSize
);
router.put(
  "/:id",
  authenticate,
  isAdmin,
  validateProductSizeUpdate,
  updateProductSize
);
router.get("/:product_id", getProductSizesByProduct);
router.get("/:product_id/:size/", getProductSizesBySize);

module.exports = router;
