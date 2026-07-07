const proudct = require("./models/productSchema");
const category = require("./models/cartSchema");
const cart = require("./models/cartSchema");
const order = require("./models/orderSchema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.mongodb_url);
    console.log("Database connected");

    await category.deleteMany();
    await proudct.deleteMany();
    await cart.deleteMany();
    await order.deleteMany();

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
      },
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
        quantity: 6,
      },
      {
        name: "Shirt",
        quantity: 6,
      },
      {
        name: "5 Shirt",
        quantity: 6,
      },
    ]);

    const cart1 = await cart.create({
      name: "5 Shirt",
      quantity: 6,
    });

    console.log("seed completed");
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();