const mongoose = require("mongoose");
const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../middleWares/AppError");

const getAllItemsInCart = asyncHandler(async (req, res) => {
  try {
    const cartItems = await Cart.find();
    ok(res, cartItems, "List of all items in the cart");
  } catch (error) {
    throw new AppError("Error retrieving cart items", 500);
  }
});

const createItemInCart = asyncHandler(async (req, res) => {
  const {products,quantity } = req.body;

  if (!prouduct|| !quantity) {
    throw new AppError("prouductand quantity are required", 400);
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const quantityToAdd = Number(number);
  if (quantityToAdd <= 0) {
    throw new AppError("Quantity must be greater than zero", 400);
  }

  const existingCartItem = await Cart.findOne({ id });
  if (existingCartItem) {
    const newQuantity = existingCartItem.numberOfItems + quantityToAdd;
    if (product.stock < newQuantity) {
      throw new AppError("Insufficient stock for this product", 400);
    }

    existingCartItem.numberOfItems = newQuantity;
    await existingCartItem.save();
    return ok(res, existingCartItem, "Cart item quantity updated");
  }

  if (product.stock < quantityToAdd) {
    throw new AppError("Insufficient stock for this product", 400);
  }

  const newItem = new Cart({ product, numberOfItems: quantityToAdd });
  await newItem.save();
  ok(res, newItem, "Item added to the cart");
});

const deleteItemFromCart = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const itemToDelete = await Cart.findOne({ id });
    if (!itemToDelete) {
      throw new AppError("Item not found in the cart", 404);
    }
    await itemToDelete.deleteOne();
    ok(res, itemToDelete, "Item deleted from the cart");
  } catch (error) {
    throw new AppError(
      "Error deleting item from the cart",
      error.statusCode || 400,
    );
  }
});

const deleteAllItemsFromCart = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const itemToDelete = await Cart.findOne({ id });
    if (!itemToDelete) {
      throw new AppError("Item not found in the cart", 404);
    }
    await itemToDelete.deleteAll();
    ok(res, itemToDelete, "Item deleted from the cart");
  } catch (error) {
    throw new AppError(
      "Error deleting item from the cart",
      error.statusCode || 400,
    );
  }
});
module.exports = {
  getAllItemsInCart,
  createItemInCart,
  deleteItemFromCart,
  deleteAllItemsFromCart,
};
