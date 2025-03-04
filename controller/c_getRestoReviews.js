//can be used by resto, customer, and admin

const { reviews } = require('../model/review'); 
const { v4: uuidv4 } = require("uuid"); 


exports.postReview = async (req, res) => { 
    try {
        const { restaurantId, customerName, rating, reviewText } = req.body;
        const media = req.files ? req.files.map(file => file.path) : []; // Array of media file paths

        if (!restaurantId || !customerName || !rating || !reviewText) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newReview = new reviews({
            _id: uuidv4(), // Generate unique review ID
            restaurantId,
            customerName,
            rating,
            reviewText,
            media
        });

        await newReview.save();
        console.log("Review posted successfully:", newReview);

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("Error posting review:", error);
        res.status(500).json({ error: "Failed to post review" });
    }
}; 

exports.getReviewsByRestaurant = async (req, res) => {
    try {
        let restaurantId = req.params.restaurantId;
        console.log("Raw restaurantId:", restaurantId);

        // ✅ Decode safely
        try {
            restaurantId = decodeURIComponent(restaurantId);
        } catch (err) {
            console.error("URI Decoding Error:", err);
            return res.status(400).json({ error: "Invalid restaurant ID format" });
        }

        console.log("Decoded restaurantId:", restaurantId);

        const review = await reviews.find({ restaurantId });
        console.log("Reviews found:", review);

        res.json(review);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};