const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: {
        type: String
    },
    desc: {
        type: String,
        required: true
    },
    images: { type: Array },
    link: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema);