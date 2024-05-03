const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "";

const productRouter = require('./routes/products.route.js')

mongoose.connect(mongoURI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));


// Define a route
app.use("/api", require('./routes/products.route.js'));
app.use("/api/auth", require('./routes/auth.route.js'));


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
