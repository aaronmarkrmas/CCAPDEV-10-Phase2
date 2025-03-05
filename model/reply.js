const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    _id: String, //restoID
    reviewId: { type: String, required: true },
    restoName: { type: String, required: true },
    datePosted: { type: Date, required: true, default: Date.now },
    isEdited: { type: Boolean, required: true, default: false },
    dateEdited: { type: Date }
});

module.exports = {
    replies: mongoose.model('replies', replySchema)
};