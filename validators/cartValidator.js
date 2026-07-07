const { body } = require("express-validator");

const cartValidator = [
    body("product")
            .notEmpty()
        .withMessage("product is required"),
    body("quantity")
        .notEmpty()
        .withMessage("product quantity is required")
        .isNumeric()
        .withMessage("quantity must be number"),

];

module.exports = cartValidator;