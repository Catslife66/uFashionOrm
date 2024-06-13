const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const validateUserRegistration = [
  body("username")
    .isLength({ min: 3 })
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value } });
      if (user) {
        throw new Error("This username has been taken.");
      }
      return true;
    }),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("This email has been registered.");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 8 })
    .custom((value) => {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)) {
        throw new Error(
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
        );
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserLogin = [
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").notEmpty().withMessage("Please enter your password."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateCategoryCreate = [
  body("name")
    .notEmpty()
    .withMessage("please provide a name for this category."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateCategoryUpdate = [
  body("name")
    .notEmpty()
    .withMessage("please provide a new name for this category."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateProductCreate = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("category_id").notEmpty().withMessage("Category is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateProductUpdate = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  body("description")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("category_id").optional().notEmpty().withMessage("Category is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateCategoryCreate,
  validateCategoryUpdate,
  validateProductCreate,
  validateProductUpdate,
};
