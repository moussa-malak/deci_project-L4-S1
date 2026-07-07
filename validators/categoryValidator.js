const { body } = require("express-validator");

const categoryValidator = [

    body("name")
        .notEmpty()
        .withMessage("category name is required"),
    body("description")
        .notEmpty()
        .withMessage("Category description is required")
];
module.exports = categoryValidator;