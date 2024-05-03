const user = require('../models/user');

const router = require('express').Router();
const CryptoJS = require('crypto-js');

// register 
router.post('/register', async (req, res) => {
    const newUser = new user({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json({ err: err })
    }

})

//login 
router.post("/login", async (req, res) => {
    try {
        const foundUser = await user.findOne({ username: req.body.username });
        if (!foundUser) {
            return res.status(401).json("Wrong credentials");
        }

        const decryptedPassword = CryptoJS.AES.decrypt(
            foundUser.password,
            process.env.PASS_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword !== req.body.password) {
            return res.status(401).json("Wrong credentials");
        }

        const { password, ...others } = foundUser._doc

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json({ err: err });
    }
});





module.exports = router;