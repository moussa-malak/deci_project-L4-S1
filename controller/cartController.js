const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getCart = async () => {
  let cart = await Cart.findOne().populate("items.product");
  if (!cart) {
    cart = await Cart.create({ items: [], totalPrice: 0 });
    cart = await Cart.findById(cart._id).populate("items.product");
  }
  return cart;
};

const calculateTotalPrice = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const formatCart = (cart) => ({
  items: cart.items.map((item) => ({
    product: item.product
      ? {
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          description: item.product.description,
          category: item.product.category,
        }
      : null,
    quantity: item.quantity,
    price: item.price,
    totalPrice: item.price * item.quantity,
  })),
  totalPrice: cart.totalPrice,
});

const getAllItemsInCart = asyncHandler(async (req, res) => {
  const cart = await getCart();
  ok(res, formatCart(cart), "Cart retrieved successfully");
});

const createItemInCart = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;

  if (!product || quantity == null) {
    throw new AppError("Product and quantity are required", 400);
  }

  const productDoc = await Product.findById(product);
  if (!productDoc) {
    throw new AppError("Product not found", 404);
  }

  const quantityToAdd = Number(quantity);
  if (!Number.isFinite(quantityToAdd) || quantityToAdd <= 0) {
    throw new AppError("Quantity must be a number greater than zero", 400);
  }

  const cart = await getCart();
  const existingItem = cart.items.find((item) =>
    item.product.equals(productDoc._id),
  );

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantityToAdd;
    if (productDoc.stock < newQuantity) {
      throw new AppError("Insufficient stock for this product", 400);
    }
    existingItem.quantity = newQuantity;
    existingItem.price = productDoc.price;
  } else {
    cart.items.push({
      product: productDoc._id,
      quantity: quantityToAdd,
      price: productDoc.price,
    });
  }

  cart.totalPrice = calculateTotalPrice(cart.items);
  await cart.save();
  await cart.populate("items.product");

  ok(res, formatCart(cart), "Item added to the cart");
});

const updateItemQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity == null) {
    throw new AppError("Quantity is required", 400);
  }

  const quantityToSet = Number(quantity);
  if (!Number.isFinite(quantityToSet) || quantityToSet < 0) {
    throw new AppError("Quantity must be a non-negative number", 400);
  }

  const cart = await getCart();
  const item = cart.items.find((item) => item.product.equals(productId));
  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  if (quantityToSet === 0) {
    cart.items = cart.items.filter((i) => !i.product.equals(productId));
  } else {
    const productDoc = await Product.findById(productId);
    if (!productDoc) {
      throw new AppError("Product not found", 404);
    }
    if (productDoc.stock < quantityToSet) {
      throw new AppError("Insufficient stock for this product", 400);
    }
    item.quantity = quantityToSet;
    item.price = productDoc.price;
  }

  cart.totalPrice = calculateTotalPrice(cart.items);
  await cart.save();
  await cart.populate("items.product");

  ok(res, formatCart(cart), "Cart item updated successfully");
});

const deleteItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await getCart();
  const item = cart.items.find((i) => i.product.equals(productId));
  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  cart.items = cart.items.filter((i) => !i.product.equals(productId));
  cart.totalPrice = calculateTotalPrice(cart.items);
  await cart.save();

  ok(res, formatCart(cart), "Item removed from the cart");
});

const deleteAllItemsFromCart = asyncHandler(async (req, res) => {
  const cart = await getCart();
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  ok(res, formatCart(cart), "Cart cleared successfully");
});

module.exports = {
  getAllItemsInCart,
  createItemInCart,
  updateItemQuantity,
  deleteItemFromCart,
  deleteAllItemsFromCart,
};
