const products = require("./models/productSchema");
const category = require("./models/categorySchema");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB");
        await category.deleteMany();
        await products.deleteMany();
        const electronicsCategory = await category.create({
            name: "Electronics",

            description: "Electronic devices and gadgets"
        });
        const cloths = await category.create({
            name: "Clothing",
            description: "Apparel and accessories"
        });
        await products.insertMany([
            {
                name: "Smartphone",
                description: "Latest model smartphone",
                price: 699.99,
                category: electronicsCategory._id
            },
            {
                name: "T-Shirt",
                description: "Cotton t-shirt",
                price: 19.99,
                category: cloths._id
            }
        ]);
        console.log("seed completed");
        process.exit();
    })
    .catch(err => {
        console.log("Error:", err);
        process.exit(1);

    })


