const express = require("express");
const router = express.Router();
const {
  getUserList,
  getUser,
  registerUser,
  loginUser,
  loginAdmin,
} = require("../controllers/userController");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../middleware/validateMiddleware");

router.get("/", getUserList);
router.get("/verify", getUser); // check if the use is logged in.
router.post("/login", validateUserLogin, loginUser);
router.post("/register", validateUserRegistration, registerUser);
router.post("/admin/login", validateUserLogin, loginAdmin);

module.exports = router;
