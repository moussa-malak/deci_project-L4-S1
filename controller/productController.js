const mongoose = require("mongoose");
const Product = require("../models/productSchema");
const Category = require("../models/categorySchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// 5.1 Products CRUD - Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("category");
  ok(res, products, "List of all products");
});

// 5.1 Products CRUD - Get product by id with populate
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  ok(res, product, "Product found");
});

// 5.1 Products CRUD - Create product
// 5.4 Category Validation on POST
const createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    throw new AppError("Name, price, and category are required", 400);
  }

  // Validate category exists
//   const categoryExists = await Category.findById(category);
//   if (!categoryExists) {
//     throw new AppError("Category not found", 404);
//   }

  const product = new Product({ name, price, category });
  await product.save();
  await product.populate("category");

  ok(res, product, "Product created successfully");
});

// 5.1 Products CRUD - Update product
const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, price, category } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  // Validate category if provided
  if (category) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      throw new AppError("Category not found", 404);
    }
    product.category = category;
  }

  if (name) product.name = name;
  if (price) product.price = price;

  await product.save();
  await product.populate("category");

  ok(res, product, "Product updated successfully");
});

// 5.1 Products CRUD - Delete product
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  ok(res, product, "Product deleted successfully");
});

// 5.2 Dynamic Filtering
const filterProducts = asyncHandler(async (req, res) => {
  const { name, price, minPrice, maxPrice, category } = req.query;

  let query = {};

  // Filter by name (case-insensitive)
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  // Filter by exact price
  if (price) {
    query.price = Number(price);
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  // Filter by category
  if (category) {
    query.category = category;
  }

  const products = await Product.find(query).populate("category");
  ok(res, products, "Filtered products");
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
};
