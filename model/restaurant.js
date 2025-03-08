const mongoose = require('mongoose');

//_id is the email. we named it _id for it to not generate another _id
const restoAccSchema = new mongoose.Schema({
    _id: String,
    restoName: { type: String, required: true },
    password: { type: String, required: true },
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

module.exports = {
    restaurants: mongoose.model('restaurants', restoAccSchema)
};