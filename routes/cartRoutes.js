const mongoose = require('mongoose');
const express = require("express");
const Router = express.Router();
const Cart = require("../models/cartSchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const getAllItemsInCart = require("../controller/cartController").getAllItemsInCart;
const createItemInCart = require("../controller/cartController").createItemInCart;
const deleteItemFromCart = require("../controller/cartController").deleteItemFromCart;
const deleteAllItemsFromCart = require("../controller/cartController").deleteAllItemsFromCart;

Router.get('/', getAllItemsInCart);
Router.post('/add', createItemInCart);
Router.delete('/clear/:id', deleteItemFromCart);
Router.delete('/clear', deleteAllItemsFromCart);
module.exports = Router;