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
  getProductSize,
} = require("../controllers/productSizeController");

router.get("", getProductSize);
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
router.get("/:prodId/:size/", getProductSizesBySize);

module.exports = router;
