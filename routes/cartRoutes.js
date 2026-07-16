const express = require("express");
const Router = express.Router();
const {
  getAllItemsInCart,
  createItemInCart,
  updateItemQuantity,
  deleteItemFromCart,
  deleteAllItemsFromCart,
} = require("../controller/cartController");
const cartValidator = require("../validators/cartValidator");

Router.get("/", getAllItemsInCart);
Router.post("/items", cartValidator, createItemInCart);
Router.patch("/items/:productId", updateItemQuantity);
Router.delete("/items/:productId", deleteItemFromCart);
Router.delete("/", deleteAllItemsFromCart);

module.exports = Router;
