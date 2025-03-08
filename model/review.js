const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    _id: String, // Unique ID for the review
    restaurantId: { type: String, required: true }, // The restaurant being reviewed
    customerEmail: { type: String, required: true }, // Name of the reviewer
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1-5)
    reviewTitle: { type: String, required: true }, // Review title
    reviewText: { type: String, required: true }, // Review content
    like: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    media: [{ type: String }], // Array of image/video URLs
    datePosted: { type: Date, default: Date.now }, // Timestamp
    edited: { type: Boolean, default: false }, // Edited status
}, { collection: "reviews" });

const Review = mongoose.model("Review", reviewSchema); 
module.exports = Review; 
