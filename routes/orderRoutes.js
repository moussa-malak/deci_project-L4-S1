const express = require("express");
const Router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controller/orderController");
const orderValidator = require("../validators/orderValidator");
const { validationResult } = require("express-validator");
Router.use(express.json());

Router.get("/", getAllOrders);
Router.get("/:id", getOrderById);
Router.post(
  "/",
  orderValidator,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createOrder,
);
Router.patch("/:id/status", updateOrderStatus);

module.exports = Router;
