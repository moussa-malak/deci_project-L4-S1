const proudct = require("./models/productSchema");
const category = require("./models/cartSchema");
const cart = require("./models/cartSchema");
 const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
try {
  mongoose.connect(process.env.mongodb_url);
  then(async () => {
    console.log("Database connected");
    await category.deleteMany();
    await proudct.deleteMany();

    const electronics = await category.create({
      name: "Electronics",
      description: "Electronic devices and gadgets",
    });
    const clothes = await category.create({
      name: "Clothes",
      description: "Apparel and fashion items",
    });
    await proudct.insertMany([
      {
        name: "iPhone",
        description: "Latest model smartphone",
        price: 999.99,
        category: electronics._id,
      },
      {
        name: "T-Shirt",
        description: "Cotton t-shirt",
        price: 19.99,
        category: clothes._id,
      }
    ]);
    await proudct.create({
      name: "T-Shirt",
      description: "Cotton t-shirt",
      price: 19.99,
      category: clothes._id,
    });

    await cart.insertMany([
      {
        name: "T-Shirt",
        totalPrice: 19.99,
        quantity: 6,
      },
      {
        name: "Shirt",
        totalPrice: 19,
        quantity: 6,
      },
      {
        name: "5 Shirt",
        totalPrice: 1925.99,
        quantity: 6,
      }
    ])
  })
      console.log("seed completed");
    process.exit(1);
} catch {
  err => (
    console.log(err)
  )
};