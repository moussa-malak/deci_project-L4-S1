const express = require("express");
const dotenv = require("dotenv");
const config = dotenv.config();
const app = express();
const port = process.env.port || 3000;
const connectDb = require("./config/connectDb");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const cartRouter = require("./routes/cartRoutes");
const { errorHandler } = require("./utils/response");
const notFound = require("./middleWares/404");

app.use(express.json());

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

app.use(notFound);

app.use(errorHandler);

const start = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server is running on port ${process.env.port}`);
  });
};

start();
