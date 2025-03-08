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
        data: Buffer, // Store image as binary
        contentType: String // Store MIME type (e.g., "image/png")
      }
}, { collection: "restaurants"}); 

const Restaurant = mongoose.model("Restaurant", restoAccSchema);
module.exports = Restaurant; 