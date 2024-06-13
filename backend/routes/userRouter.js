const express = require("express");
const router = express.Router();
const {
  getUserList,
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../middleware/validateMiddleware");

router.get("/", getUserList);
router.post("/verify", getUser);
router.post("/login", validateUserLogin, loginUser);
router.post("/register", validateUserRegistration, registerUser);

module.exports = router;
