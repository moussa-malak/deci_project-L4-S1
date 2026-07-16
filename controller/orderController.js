const Order = require("../models/orderSchema");
const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const createOrder = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find();
  if (!cartItems.length) {
    throw new AppError("Cart is empty. Add items before checkout", 400);
  }

  const orderItems = [];
  let totalPrice = 0;

  for (const cartItem of cartItems) {
    const product = await Product.findById(cartItem.id);
    if (!product) {
      throw new AppError(
        `Product not found for cart item ${cartItem.name}`,
        404,
      );
    }

    if (product.stock < cartItem.numberOfItems) {
      throw new AppError(`Insufficient stock for product ${product.name}`, 400);
    }

    product.stock -= cartItem.numberOfItems;
    await product.save();

    const itemTotal = product.price * cartItem.numberOfItems;
    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: cartItem.numberOfItems,
    });
    totalPrice += itemTotal;
  }

  await order.save();
  await Cart.deleteMany();

  ok(res, order, "Order created successfully");
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  ok(res, orders, "List of all orders");
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  ok(res, order, "Order found");
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!status || !validStatuses.includes(status)) {
    throw new AppError(
      "Invalid status. Valid values are pending, processing, shipped, delivered, cancelled",
      400,
    );
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError("Order not found", 404);
  }

  order.status = status;
  await order.save();
  ok(res, order, "Order status updated successfully");
});

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
