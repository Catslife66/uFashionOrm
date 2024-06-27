const express = require("express");

const categoryRoutes = require("./categoryRouter");
const userRoutes = require("./userRouter");
const productRoutes = require("./productRouter");
const productSizeRoutes = require("./productSizeRouter");
const productImageRoutes = require("./productImageRouter");
const orderRoutes = require("./orderRouter");
const orderItemRoutes = require("./orderItemRouter");
const reviewRoutes = require("./reviewRouter");

const router = express.Router();

router.use("/categories", categoryRoutes);
router.use("/productimage", productImageRoutes);
router.use("/products", productRoutes);
router.use("/productsize", productSizeRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/orderitems", orderItemRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
