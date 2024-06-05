const express = require('express');
const router = express.Router();
const Hero = require('../models/hero');

router.get('/heroes', async (req, res) => {
    try {
        const heroes = await Hero.find();
        res.status(200).json(heroes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/heroes', async (req, res) => {
    const { images } = req.body;
    const hero = new Hero({ images });

    try {
        const newHero = await hero.save();
        res.status(201).json(newHero);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
