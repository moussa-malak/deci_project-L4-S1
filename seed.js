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

    await order.deleteMany();
    await proudct.deleteMany();
    await category.deleteMany();

    const electronics = await category.create({
      name: "Electronics",
      description: "Electronic devices and gadgets",
    });
    const clothes = await category.create({
      name: "Clothes",
      description: "Apparel and fashion items",
    });
        const books = await category.create({
      name: "books",
      description: "books and reading items",
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
      {name: "mouse",
        description: "a gaming mouse",
        price: 100.99,
        category: electronics._id,
      },
      {
        name: "jeans",
        description: " jeans clothes",
        price: 19.99,
        category: clothes._id,
      },
       { name: "clean code",
        description: "tips to be a good programmer",
        price:75,
        category: books._id,
      },
      {
        name: "basics of maths",
        description: "the first step to be a scientist",
        price: 150,
        category: books._id,
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