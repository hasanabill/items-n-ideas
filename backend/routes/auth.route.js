const user = require('../models/user');
const router = require('express').Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

// Register
router.post('/register', verifyToken, async (req, res) => {
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json({ err: err });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const foundUser = await user.findOne({ username: req.body.username });
        if (!foundUser) {
            return res.status(401).json("User doesn't exist");
        }

        const decryptedPassword = CryptoJS.AES.decrypt(
            foundUser.password,
            process.env.PASS_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword !== req.body.password) {
            return res.status(401).json("Incorrect information");
        }

        const accessToken = jwt.sign({ id: foundUser._id, username: foundUser.username }, process.env.JWT_SECRET);

        const { password, ...others } = foundUser._doc;

        res.status(200).json({ accessToken, ...others });
    } catch (err) {
        res.status(500).json({ err: err });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const foundUser = await user.findOne({ username: req.body.username });
        if (!foundUser) {
            return res.status(401).json("User doesn't exist");
        }

        const decryptedPassword = CryptoJS.AES.decrypt(
            foundUser.password,
            process.env.PASS_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword !== req.body.oldPassword) {
            return res.status(401).json("Old password is incorrect");
        }

        const newPassword = CryptoJS.AES.encrypt(req.body.newPassword, process.env.PASS_KEY).toString();
        foundUser.password = newPassword;
        await foundUser.save();

        res.status(200).json("Password has been updated");
    } catch (err) {
        res.status(500).json({ err: err });
    }
});


module.exports = router;