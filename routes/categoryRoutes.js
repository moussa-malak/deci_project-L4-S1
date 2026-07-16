const express = require("express");
const Router = express.Router();
const getAllCategories =
  require("../controller/categoryController").getAllCategories;
const getCategoryById =
  require("../controller/categoryController").getCategoryById;
const createCategory =
  require("../controller/categoryController").createCategory;
const updateCategory =
  require("../controller/categoryController").updateCategory;
  const deleteCategory =
  require("../controller/categoryController").deleteCategory;
const categoryValidator = require("../validators/categoryValidator");
Router.use(express.json());

Router.get("/", getAllCategories);

Router.get("/:id", getCategoryById);

Router.post("/", createCategory);

Router.patch("/:id", updateCategory);

Router.delete("/:id", deleteCategory);

module.exports = Router;
