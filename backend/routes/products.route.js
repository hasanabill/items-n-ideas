const router = require('express').Router();
const product = require('../models/product');


router.get('/products', async (req, res) => {
    try {
        const products = await product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const foundProduct = await product.findById(productId);

        if (!foundProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(foundProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/product', async (req, res) => {
    try {
        const { name, price, categories, desc, images, link } = req.body;

        const newProduct = new product({
            name,
            price,
            categories,
            desc,
            images,
            link
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/product/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, categories, desc, images, link } = req.body;

        const foundProduct = await product.findById(productId);

        if (!foundProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        foundProduct.name = name || foundProduct.name;
        foundProduct.price = price || foundProduct.price;
        foundProduct.categories = categories || foundProduct.categories;
        foundProduct.desc = desc || foundProduct.desc;
        foundProduct.images = images || foundProduct.images;
        foundProduct.link = link || foundProduct.link;

        const updatedProduct = await foundProduct.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/product/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        const foundProduct = await product.findById(productId);

        if (!foundProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        await product.deleteOne({ _id: productId });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;