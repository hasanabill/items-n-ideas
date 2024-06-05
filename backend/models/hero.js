const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
    images: { type: Array }
})

module.exports = mongoose.model("Hero", heroSchema);