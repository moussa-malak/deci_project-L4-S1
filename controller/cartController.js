const mongoose = require("mongoose");
const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getAllItemsInCart = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find().populate("product");

  const formattedItems = cartItems.map((item) => ({
    id: item._id,
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
    totalPrice: item.product ? item.product.price * item.quantity : null,
  }));

  ok(res, formattedItems, "List of all items in the cart");
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

  const existingCartItem = await Cart.findOne({ product: productDoc._id });
  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + quantityToAdd;
    if (productDoc.stock < newQuantity) {
      throw new AppError("Insufficient stock for this product", 400);
    }

    existingCartItem.quantity = newQuantity;
    await existingCartItem.save();
    await existingCartItem.populate("product");

    return ok(
      res,
      {
        id: existingCartItem._id,
        product: {
          id: existingCartItem.product._id,
          name: existingCartItem.product.name,
          price: existingCartItem.product.price,
        },
        quantity: existingCartItem.quantity,
        totalPrice: existingCartItem.product.price * existingCartItem.quantity,
      },
      "Cart item quantity updated",
    );
  }

  if (productDoc.stock < quantityToAdd) {
    throw new AppError("Insufficient stock for this product", 400);
  }

  const newItem = new Cart({
    product: productDoc._id,
    quantity: quantityToAdd,
  });
  await newItem.save();
  await newItem.populate("product");

  ok(
    res,
    {
      id: newItem._id,
      product: {
        id: newItem.product._id,
        name: newItem.product.name,
        price: newItem.product.price,
      },
      quantity: newItem.quantity,
      totalPrice: newItem.product.price * newItem.quantity,
    },
    "Item added to the cart",
  );
});

const deleteItemFromCart = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const itemToDelete = await Cart.findById(id);
    if (!itemToDelete) {
      throw new AppError("Item not found in the cart", 404);
    }
    await itemToDelete.deleteOne();
    ok(res, { id }, "Item deleted from the cart");
  } catch (error) {
    throw new AppError(
      "Error deleting item from the cart",
      error.statusCode || 400,
    );
  }
});

const deleteAllItemsFromCart = asyncHandler(async (req, res) => {
  await Cart.deleteMany();
  ok(res, { deleted: true }, "All cart items deleted");
});

module.exports = {
  getAllItemsInCart,
  createItemInCart,
  deleteItemFromCart,
  deleteAllItemsFromCart,
};
