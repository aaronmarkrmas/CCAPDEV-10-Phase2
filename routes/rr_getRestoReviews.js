const express = require('express');
const router = express.Router();
const { Review } = require('../CCAPDEV-10-Phase2/model/customer'); 

// get all reviewIDs for a restaurant
router.get('/getRestoReviews/:email', async (req, res) => {
    try {
        const { email } = req.params;
        
        const reviews = await Review.find({ restaurantEmail: email }, '_id');
        
        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this restaurant' });
        }

        const reviewIDs = reviews.map(review => review._id);
        res.status(200).json({ reviewIDs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

module.exports = router;
