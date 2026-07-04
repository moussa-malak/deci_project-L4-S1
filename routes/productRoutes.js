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

Router.use(express.json());

// 5.1 Products CRUD
Router.get("/", getAllProducts);

Router.get("/filter", filterProducts);

// 5.3 populate() on GET /:id
Router.get("/:id", getProductById);

Router.post("/", createProduct);

Router.put("/:id", updateProduct);

Router.delete("/:id", deleteProduct);

module.exports = Router;
