const Order = require("../models/orderSchema");
const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne().populate("items.product");
  if (!cart || !cart.items.length) {
    throw new AppError("Cart is empty. Add items before checkout", 400);
  }

  const orderItems = [];
  let totalPrice = 0;

  for (const cartItem of cart.items) {
    const product = await Product.findById(
      cartItem.product._id || cartItem.product,
    );
    if (!product) {
      throw new AppError(`Product not found for cart item`, 404);
    }

    if (product.stock < cartItem.quantity) {
      throw new AppError(`Insufficient stock for product ${product.name}`, 400);
    }

    product.stock -= cartItem.quantity;
    await product.save();

    const itemTotal = product.price * cartItem.quantity;
    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: cartItem.quantity,
    });
    totalPrice += itemTotal;
  }

  const orderNumber = `ORD-${Date.now()}`;

  const order = await Order.create({
    orderNumber,
    items: orderItems,
    totalPrice,
    shippingAddress: req.body.shippingAddress || {},
  });

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  ok(res, order, "Order created successfully");
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("items.product");
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
