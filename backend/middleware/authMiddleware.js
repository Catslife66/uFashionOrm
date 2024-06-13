const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Access denied. User not found." });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

const isAdmin = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Access denied. User not authenticated." });
    }
    if (!req.user.role !== role) {
      return res
        .status(403)
        .json({ error: `Access denied. ${role} role is required.` });
    }
    next();
  };
};

module.exports = { authenticate, isAdmin };
