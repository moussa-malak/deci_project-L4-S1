const express = require("express");
const Router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
} = require("../controller/productController");
const productValidator = require("../validators/productValidator");
Router.use(express.json());

Router.get("/", getAllProducts);

Router.get("/filter", filterProducts);

Router.get("/:id", getProductById);

Router.post("/", createProduct);

Router.patch("/:id", updateProduct);

Router.delete("/:id", deleteProduct);

module.exports = Router;
