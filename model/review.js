const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    _id: String, // Unique ID for the review
    restaurantId: { type: String, required: true }, // The restaurant being reviewed
    customerName: { type: String, required: true }, // Name of the reviewer
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1-5)
    reviewText: { type: String, required: true }, // Review content
    like: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    media: [{ type: String }], // Array of image/video URLs
    datePosted: { type: Date, default: Date.now }, // Timestamp
    edited: { type: Boolean, default: false }, // Edited status
    replies: [{
        restoUserName: String, // Restaurant reply name
        replyText: String, // Reply content
        replyDatePosted: { type: Date, default: Date.now },
        replyEdited: { type: Boolean, default: false }
    }]
}, { collection: "reviews" });

module.exports = {
    reviews: mongoose.model('reviews', reviewSchema),
};
