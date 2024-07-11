const express = require("express");
const router = express.Router();
const userRoutes = require("./userRouter");
const categoryRoutes = require("./categoryRouter");
const productRoutes = require("./productRouter");
const productSizeRoutes = require("./productSizeRouter");
const productImageRoutes = require("./productImageRouter");
const orderRoutes = require("./orderRouter");
const orderItemRoutes = require("./orderItemRouter");
const reviewRoutes = require("./reviewRouter");
const cartRoutes = require("./cartRouter");

router.use("/cart", cartRoutes);
router.use("/categories", categoryRoutes);
router.use("/productimage", productImageRoutes);
router.use("/products", productRoutes);
router.use("/productsize", productSizeRoutes);

router.use("/orders", orderRoutes);
router.use("/orderitems", orderItemRoutes);
router.use("/reviews", reviewRoutes);
router.use("/users", userRoutes);

module.exports = router;
