const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  numberOfItems: { type: Number, default: 1, required: true },
  // time: { type: Date, default: Date.now, required: true },
},
  {
    timestamps: true,

  });
module.exports = mongoose.model("Cart", cartSchema);