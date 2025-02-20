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
    username: { type: String, required: true },
    datePosted: { type: Date, required: true, default: Date.now },
    isEdited: { type: Boolean, required: true, default: false },
    dateEdited: { type: Date },
    rating: { type: Number, required: true, default: 0 },
    reviewText: { type: String, required: true },
    like: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    media: [{
        mediaType: { type: String, enum: ["image", "video"], required: true },
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    }]
});

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