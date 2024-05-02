const express = require('express');
const app = express();
require('dotenv').config();
const productRouter = require('./routes/products.js')

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "";
const mongoose = require('mongoose');

mongoose.connect(mongoURI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
// Define a route


app.use("/api", productRouter);


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
