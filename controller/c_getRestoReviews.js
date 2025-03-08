//can be used by resto, customer, and admin

const Restaurant = require("../model/restaurant");
const Review = require('../model/review'); 
const { v4: uuidv4 } = require("uuid"); 

exports.getReviewsByRestaurant = async (req, res) => {
    try {
        const { email } = req.params;
        const restaurant = await Restaurant.findOne({ email: email });

        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        const reviews = await Review.find({ restaurantId: restaurant._id });

        if (!reviews) {
            return res.status(404).send('No reviews found for this restaurant');
        }

        res.render('restoProfile', { restaurant, reviews });
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).send('Error fetching reviews');
    }
};

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
