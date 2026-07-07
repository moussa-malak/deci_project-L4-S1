const { body } = require("express-validator");

const productValidator = [

    body("name")
        .notEmpty()
        .withMessage("product name is required"),
    body("description")
        .notEmpty()
        .withMessage("product description is required"),
    body("price")
        .notEmpty()
        .withMessage("product price is required")
        .isNumeric()
        .withMessage("price must be number"),
    body("stock")
        .notEmpty()
        .withMessage("product stock is required")
        .isNumeric()
        .withMessage("stock must be number"),
    body("category")
        .notEmpty()
        .withMessage("category is required"),
];

module.exports = productValidator;