const express = require('express');
const router = express.Router();
const { Restaurant } = require('../CCAPDEV-10-Phase2/model/restaurant');

// get restaurant by email [check uniqueness]
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const existingRestaurant = await Restaurant.findOne({ email });
        res.status(200).json({ exists: !!existingRestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking email availability' });
    }
});

module.exports = router;
