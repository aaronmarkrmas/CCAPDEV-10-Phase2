const mongoose = require('mongoose');

const custAccSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	bio: { type: String, required: true },
	nReviews: { type: Number, required: true, default: 0 },
	pfp: {  
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true } }
});

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

const reportSchema = new mongoose.Schema({
    postId: { type: String, required: true },
    reporterUsername: { type: String, required: true },
    dateReported: { type: Date, required: true, default: Date.now },
    isResolved: { type: Boolean, required: true, default: false }
});

module.exports = {
    Customer: mongoose.model('Customer', custAccSchema),
    Review: mongoose.model('Review', reviewSchema),
	Report:  mongoose.model('Report', reportSchema)
};