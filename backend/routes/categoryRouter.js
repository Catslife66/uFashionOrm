const express = require("express");
const router = express.Router();
const {
  getCategoryList,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const {
  validateCategoryCreate,
  validateCategoryUpdate,
} = require("../middleware/validateMiddleware");

// get list
router.get("", getCategoryList);
// get an obj
router.get("/:id", authenticate, isAdmin, getCategory);
// create
router.post("", authenticate, isAdmin, validateCategoryCreate, createCategory);
// update
router.put(
  "/:id",
  authenticate,
  isAdmin,
  validateCategoryUpdate,
  updateCategory
);
// delete
router.delete("/:id", authenticate, isAdmin, deleteCategory);

module.exports = router;
