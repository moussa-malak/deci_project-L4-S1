const connectDb = require("./connectDb");
const start = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server is running on port ${process.env.port || 3000}`);
  });
};

module.exports = start;