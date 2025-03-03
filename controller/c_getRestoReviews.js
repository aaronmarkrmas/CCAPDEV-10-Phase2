//can be used by resto, customer, and admin

const { reviews } = require('../model/customer'); // Import the Review model

// GET: Fetch all reviews for a restaurant 
exports.getReviews = async (req, res) => {
    try {
        const { email } = req.params; //resto email
        console.log(`Fetching reviews for restaurant: ${email}`);

        // Find all reviews where restaurant ID matches
        const restaurantReviews = await reviews.find({ restaurantId: email });

        if (!restaurantReviews.length) {
            return res.status(404).json({ message: "No reviews found" });
        }

        console.log("Reviews found:", restaurantReviews);
        res.json(restaurantReviews); // Send reviews as JSON
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};
