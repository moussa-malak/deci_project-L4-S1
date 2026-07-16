const mongoose = require("mongoose");
const Category = require("../models/categorySchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getAllCategories = asyncHandler(async (req, res) => {
  const category = await Category.find();
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
  const { name, description } = req.body;
  if (!name || !description) {
    throw new AppError("Name and description are required", 400);
  }
  const category = new Category({ name, description });
  await category.save();
  ok(res, category, "Category created successfully");
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  const { name, description } = req.body;
  if (name) category.name = name;
  if (description) category.description = description;
  await category.save();
  ok(res, category, "Category updated successfully");
});
const deleteCategory = asyncHandler(async (req,) => {
  const category = await Category.findByIdAndDelete(req.params.id)
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  ok(res, category, "Category deleted successfully");
})

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
