const mongoose = require("mongoose");
const Category = require("../models/categorySchema");
const { response } = require("../utils/response");
const { ok } = response;
const category= require("../data/category");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getAllCategories = asyncHandler(async (req, res) => {
    const category = await Category.find();
    if (!category) {
        throw new AppError("No categories found", 404);
    }
    ok(res, category, "this is the list of categories");

});

const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  ok(res, category, "Category found");
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    throw new AppError("Name and price are required", 400);
  }
  const category = new Category({ name, price });
  await category.save();
  ok(res, category, "Category created successfully");
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  const { name, price } = req.body;
  if (name) category.name = name;
  if (price) category.price = price;
  await category.save();
  ok(res, category, "Category updated successfully");
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
};
