const router = require('express').Router();

router.get("/products", (req, res) => {
    res.send("Products");
});
router.post("/products", (req, res) => {
    console.log(req.body)
    res.send("Productssss");
});

module.exports = router;