const mongoose = require('mongoose');
const Cart = require("../models/cartSchema");
const { response } = require("../utils/response");
const { ok } = response;
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getAllItemsInCart = asyncHandler(async (req, res) => {
    try {
        const cartItems = await Cart.find();
        cartItems.forEach(item => { });
        ok(res, cartItems, "List of all items in the cart");
    } catch (error) {
        throw new AppError("Error retrieving cart items", 500);
    }
})

const createItemInCart = asyncHandler(async (req, res) => {
    try {
    const { id, name, price, number } = req.body;
    const newItem = new Cart({ id, name, price, number });
    await newItem.save();
        ok(res, newItem, "Item added to the cart");
    } catch (error) {
        throw new AppError("Error adding item to the cart", error.statusCode || 400);
    }

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
        throw new AppError("Error deleting item from the cart", error.statusCode || 400);
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
        throw new AppError("Error deleting item from the cart", error.statusCode || 400);
    }
});
module.exports = {
    getAllItemsInCart,
    createItemInCart,
    deleteItemFromCart,
    deleteAllItemsFromCart
};