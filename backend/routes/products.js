const router = require('express').Router();

router.get("/products", (req, res) => {
    res.send("Products");
});

module.exports = router;