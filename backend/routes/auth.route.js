const user = require('../models/user');

const router = require('express').Router();


// register 
router.post('/register', async (req, res) => {
    const newUser = new user({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json({ err: err })
    }

})




module.exports = router;