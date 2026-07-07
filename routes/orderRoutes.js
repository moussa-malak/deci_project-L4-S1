const express = require("express");
const Router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controller/orderController");
const orderValidator= require("../validators/orderValidator");
Router.use(express.json());

Router.get("/", getAllOrders);
Router.get("/:id", getOrderById);
Router.post("/", createOrder);
Router.patch("/:id/status", updateOrderStatus);

module.exports = Router;
