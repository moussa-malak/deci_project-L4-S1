const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      trim:true
    },
    description: {
      type: String,
      required: [true, "proudect description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true,"category is required"]
    },
    stock: {
      type: Number,
      required:[true, "proudct stock is required"],
      min:0
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
