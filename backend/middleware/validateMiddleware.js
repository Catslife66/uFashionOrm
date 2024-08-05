const { body, validationResult } = require("express-validator");
const { User, Category } = require("../models");

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
    .custom(async (value) => {
      const name = value.toLowerCase();
      const category = await Category.findOne({
        where: { name: name },
      });
      if (category) {
        throw new Error("This category has already existed.");
      }
    }),
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
    .custom(async (value) => {
      const name = value.toLowerCase();
      const category = await Category.findOne({
        where: { name: name },
      });
      if (category) {
        throw new Error(
          "This category has already existed. Cannot be updated."
        );
      }
    }),
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
    .withMessage("Product description must not be empty."),
  body("origin_price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateProductSizeCreate = [
  body("size")
    .notEmpty()
    .isIn(["XS", "xs", "Xs", "S", "s", "M", "m", "l", "L", "XL", "Xl", "xl"])
    .withMessage("Invalid size value."),
  body("stock")
    .notEmpty()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateProductSizeUpdate = [
  body("size")
    .optional()
    .isIn(["XS", "xs", "Xs", "S", "s", "M", "m", "l", "L", "XL", "Xl", "xl"])
    .withMessage("Invalid size value."),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive number."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateShippingAddressCreate = [
  body("user_id").notEmpty().withMessage("User id cannot be empty."),
  body("full_name").notEmpty().withMessage("Your name cannot be empty."),
  body("contact_number")
    .notEmpty()
    .isLength({ max: 20 })
    .withMessage("Your contact number cannot be empty."),
  body("address_line1")
    .notEmpty()
    .withMessage("Address line 1 cannot be empty."),
  body("town_city").notEmpty().withMessage("Town/City cannot be empty."),
  body("postcode")
    .notEmpty()
    .isLength({ max: 10 })
    .withMessage("Town/City cannot be empty."),
];

const validateShippingAddressUpdate = [
  body("full_name").notEmpty().withMessage("Your name cannot be empty."),
  body("contact_number")
    .notEmpty()
    .isLength({ max: 20 })
    .withMessage("Your contact number cannot be empty."),
  body("address_line1")
    .notEmpty()
    .withMessage("Address line 1 cannot be empty."),
  body("town_city").notEmpty().withMessage("Town/City cannot be empty."),
  body("postcode")
    .notEmpty()
    .isLength({ max: 10 })
    .withMessage("Town/City cannot be empty."),
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateCategoryCreate,
  validateCategoryUpdate,
  validateProductSizeCreate,
  validateProductSizeUpdate,
  validateProductCreate,
  validateProductUpdate,
  validateShippingAddressCreate,
  validateShippingAddressUpdate,
};
