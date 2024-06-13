const express = require("express");
const {
  getProductList,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProductList);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.post("/create", createProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
