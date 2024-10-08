const express = require("express");
const {
  getProductList,
  getProductsByCategory,
  searchProducts,
  getProduct,
  getProductById,
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

router.get("/search", searchProducts);
router.get("/find", getProductById);
router.get("/category/:slug", getProductsByCategory);
router.get("/:slug", getProduct);
router.get("", getProductList);

router.post("/", authenticate, isAdmin, validateProductCreate, createProduct);
router.patch(
  "/:id",
  authenticate,
  isAdmin,
  validateProductUpdate,
  updateProduct
);
router.delete("/:id", authenticate, isAdmin, deleteProduct);

module.exports = router;
