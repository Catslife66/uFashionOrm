const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

// get all users
const getUserList = async (req, res) => {
  try {
    const userList = await User.findAll();
    return res.status(200).json(userList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get a user
const getUser = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ error: "Login is required." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
};

// register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(400).json({ error: "Invalid email or password." });
      return;
    }
    const isValidPassword = await user.validPassword(password);

    if (!isValidPassword) {
      res.status(401).json({ error: "Your credential is not correct." });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUserList,
  getUser,
  registerUser,
  loginUser,
};
