const { Review } = require('../CCAPDEV-10-Phase2/model/customer'); 

// get all review IDs for a restaurant
exports.getRestoReviews = async (req, res) => {
    try {
        const { email } = req.params;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const reviews = await Review.find({ restaurantEmail: email }, '_id');

        // return an empty list instead of a 404 error if no reviews exist
        res.status(200).json({ reviewIDs: reviews.map(review => review._id) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
