const express = require("express");
const router = express.Router();
const {
  createImage,
  updateImage,
  deleteImage,
} = require("../controllers/productImageController");

router.post("/create", createImage);
router.patch("/:id", updateImage);
router.delete("/:id", deleteImage);

module.exports = router;
