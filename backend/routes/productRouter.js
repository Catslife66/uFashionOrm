const express = require("express");
const {
  getProductList,
  getProductsByCategory,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  validateProductCreate,
  validateProductUpdate,
} = require("../middleware/validateMiddleware");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProductList);
router.get("/category/:slug", getProductsByCategory);
router.post("/", authenticate, isAdmin, validateProductCreate, createProduct);
router.get("/:slug", getProduct);
router.put("/:id", authenticate, isAdmin, validateProductUpdate, updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProduct);

module.exports = router;
