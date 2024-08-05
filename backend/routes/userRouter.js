const express = require("express");
const router = express.Router();
const {
  getUserList,
  getUser,
  registerUser,
  loginUser,
  loginAdmin,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getUserShippingAddress,
} = require("../controllers/userController");
const {
  validateUserRegistration,
  validateUserLogin,
  validateShippingAddressCreate,
} = require("../middleware/validateMiddleware");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", getUserList);
router.get("/verify", getUser); // check if the use is logged in.
router.post("/login", validateUserLogin, loginUser);
router.post("/register", validateUserRegistration, registerUser);
router.post("/admin/login", validateUserLogin, loginAdmin);
router.post(
  "/shipping-addresses",
  authenticate,
  validateShippingAddressCreate,
  createShippingAddress
);
router.get("/shipping-addresses/my", authenticate, getUserShippingAddress);
router.put("/shipping-addresses/:id", authenticate, updateShippingAddress);
router.delete("/shipping-addresses/:id", authenticate, deleteShippingAddress);

module.exports = router;
