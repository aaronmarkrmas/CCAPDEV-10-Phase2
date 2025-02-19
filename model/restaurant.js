const mongoose = require('mongoose');

const restoAccSchema = new mongoose.Schema({
    email: { type: String, required: true },
    restoName: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true, default: 'Br. Bloemen Food Hall' },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    nReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    pfp: { data: Buffer, contentType: String, required: true }
});

const replySchema = new mongoose.Schema({
    replyId: { type: String, required: true },
    reviewId: { type: String, required: true },
    restoName: { type: String, required: true },
    datePosted: { type: Date, required: true, default: Date.now },
    isEdited: { type: Boolean, required: true, default: false },
    dateEdited: { type: Date }
});

module.exports = {
    Restaurant: mongoose.model('Restaurant', restoAccSchema),
    Reply: mongoose.model('Reply', replySchema)
};