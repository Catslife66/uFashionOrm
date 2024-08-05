const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const { User, ShippingAddress } = require("../models");

// get all users
const getUserList = async (req, res) => {
  try {
    const userList = await User.findAll();
    return res.status(200).json(userList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// get a user / chech login status
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
  const { username, email, password, role } = req.body;

  try {
    let userRole = role || "user";

    const user = await User.create({
      username,
      email,
      password,
      role: userRole,
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
    if (user.role !== "user") {
      return res.status(403).json({ error: "Access role denied." });
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

const loginAdmin = async (req, res) => {
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
    if (user.role === "user") {
      return res
        .status(403)
        .json({ error: "Access role denied. Admin users only." });
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

// create user shipping address
const createShippingAddress = async (req, res) => {
  const user_id = req.user.id;
  const {
    full_name,
    contact_number,
    address_line1,
    address_line2,
    town_city,
    postcode,
    county,
  } = req.body;
  try {
    if (!user_id) {
      return res
        .status(404)
        .json({ error: "Please login in to create a shipping address." });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const shippingAddress = await ShippingAddress.create({
      user_id,
      full_name,
      contact_number,
      address_line1,
      address_line2,
      town_city,
      postcode: postcode.toUpperCase(),
      county,
    });
    return res.status(201).json(shippingAddress);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// delete user shipping address
const deleteShippingAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await ShippingAddress.findByPk(id);
    if (!address) {
      return res.status(404).json({ error: "This address is not found." });
    }
    await address.destroy();
    return res
      .status(200)
      .json({ message: `Address id ${address.id} is deleted.` });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// update user shipping address
const updateShippingAddress = async (req, res) => {
  const { id } = req.params;
  const {
    full_name,
    contact_number,
    address_line1,
    address_line2,
    town_city,
    postcode,
    county,
  } = req.body;
  try {
    const address = await ShippingAddress.findByPk(id);
    if (!address) {
      return res.status(404).json({ error: "This address is not found." });
    }
    address.full_name = full_name;
    address.contact_number = contact_number;
    address.address_line1 = address_line1;
    address.address_line2 = address_line2;
    address.town_city = town_city;
    address.postcode = postcode.toUpperCase();
    address.county = county;
    await address.save();
    return res.status(200).json(address);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getUserShippingAddress = async (req, res) => {
  const user_id = req.user.id;
  try {
    if (!user_id) {
      return res.status(400).json({ error: "User must be logged in." });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User is not found." });
    }
    const addresses = await ShippingAddress.findAll({
      where: { user_id: user.id },
    });
    return res.status(200).json(addresses);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUserList,
  getUser,
  registerUser,
  loginUser,
  loginAdmin,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  getUserShippingAddress,
};
