const express = require("express");
const router = express.Router();
const {
  getProductReviews,
  getReview,
  filterProductReviews,
  createReview,
  deleteReview,
} = require("../controllers/reviewController");
const { authenticate } = require("../middleware/authMiddleware");

router.post("", authenticate, createReview);
router.get("/filter", filterProductReviews);
router.get("/product", getProductReviews);
router.get("/:id", getReview);
router.delete("/:id", deleteReview);

module.exports = router;
