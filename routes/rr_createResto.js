const express = require('express');
const router = express.Router();
const { upload } = require('../main');
const { Restaurant, Reply } = require('../CCAPDEV-10-Phase2/model/restaurant');

// create new resto
router.post('/create', upload.single('profilePhoto'), async (req, res) => {
    try {
        const { email, restoName, password, phone, description, tags } = req.body;
        const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

        const newRestaurant = new Restaurant({
            email,
            restoName,
            password,
            phone,
            description,
            tags: tagsArray,
            pfp: req.file.filename // filename
        });

        await newRestaurant.save();
        res.status(201).json({ message: 'Restaurant created successfully', restaurant: newRestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});