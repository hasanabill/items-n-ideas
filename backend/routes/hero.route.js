const express = require('express');
const router = express.Router();
const Hero = require('../models/hero');
const verifyToken = require('../middleware/verifyToken');

router.get('/', async (req, res) => {
    try {
        const heroes = await Hero.find();
        res.status(200).json(heroes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', verifyToken, async (req, res) => {
    const { images } = req.body;
    const hero = new Hero({ images });

    try {
        const newHero = await hero.save();
        res.status(201).json(newHero);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    const { images } = req.body;
    console.log(images)

    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) {
            return res.status(404).json({ message: "Hero not found" });
        }

        hero.images = images || hero.images;
        const updatedHero = await hero.save();
        res.status(200).json(updatedHero);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
