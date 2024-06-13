const express = require("express");
const router = express.Router();
const {
  getCategoryList,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// get list
router.get("/", getCategoryList);
// get an obj
router.get("/:id", getCategory);
// create
router.post("/create", createCategory);
// update
router.put("/:id", updateCategory);
// delete
router.delete("/:id", deleteCategory);

module.exports = router;
