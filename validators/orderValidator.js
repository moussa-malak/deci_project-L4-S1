const { body } = require("express-validator");

const oederValidator = [
    body("product")
            .notEmpty()
        .withMessage("product is required"),
    body("totalPrice")
        .notEmpty()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("price must be number"),

];

module.exports = orderValidator;