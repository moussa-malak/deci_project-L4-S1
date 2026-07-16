const { body } = require("express-validator");

const orderValidator = [
  body("shippingAddress.fullName")
    .notEmpty()
    .withMessage("fullName is required"),
  body("shippingAddress.address").notEmpty().withMessage("address is required"),
  body("shippingAddress.city").notEmpty().withMessage("city is required"),
  body("shippingAddress.postalCode")
    .notEmpty()
    .withMessage("postalCode is required"),
  body("shippingAddress.country").notEmpty().withMessage("country is required"),
];

module.exports = orderValidator;
