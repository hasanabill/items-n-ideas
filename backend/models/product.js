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
        type: Array
    },
    desc: {
        type: String,
        required: true
    },
    images: { type: Array }
});

module.exports = mongoose.model("Product", productSchema);