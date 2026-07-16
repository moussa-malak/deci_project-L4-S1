const { body } = require("express-validator");

const orderValidator = [
  body("shippingAddress.fullName")
    .notEmpty()
    .withMessage("fullName is required"),
  body("shippingAddress.address").notEmpty().withMessage("address is required"),

];

module.exports = orderValidator;
