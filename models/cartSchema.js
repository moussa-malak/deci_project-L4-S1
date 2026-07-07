const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);
const cart = mongoose.model("Cart", cartSchema);
module.exports = cart;