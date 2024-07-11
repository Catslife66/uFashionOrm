const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  getProductImages,
  getSingleImage,
  createImage,
  updateImage,
  deleteImage,
} = require("../controllers/productImageController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  authenticate,
  isAdmin,
  upload.single("image"),
  createImage
);
router.get("/product/:productSlug", getProductImages);
router.get("/:id", getSingleImage);
router.put("/:id", upload.single("image"), updateImage);
router.delete("/:id", authenticate, isAdmin, deleteImage);

module.exports = router;
