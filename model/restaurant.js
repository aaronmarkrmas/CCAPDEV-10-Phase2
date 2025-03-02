const mongoose = require('mongoose');

//_id is the email. we named it _id for it to not generate another _id
const restoAccSchema = new mongoose.Schema({
    _id: String,
    restoName: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true, default: 'Br. Bloemen Food Hall' },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    nReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    location: {type: String, required: true, default: 'Br. Bloemen Hall'},
    pfp: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
      }
}, { collection: "restaurants"}); 

const replySchema = new mongoose.Schema({
    _id: String, //restoID
    reviewId: { type: String, required: true },
    restoName: { type: String, required: true },
    datePosted: { type: Date, required: true, default: Date.now },
    isEdited: { type: Boolean, required: true, default: false },
    dateEdited: { type: Date }
});

module.exports = {
    restaurants: mongoose.model('restaurants', restoAccSchema),
    replies: mongoose.model('replies', replySchema)
};