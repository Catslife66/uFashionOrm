const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
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

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "Access denied. User not authenticated." });
  }
  if (req.user.role == "user") {
    return res
      .status(403)
      .json({ error: "Access denied. Admin role is required." });
  }
  next();
};

module.exports = {
  authenticate,
  isAdmin,
};
