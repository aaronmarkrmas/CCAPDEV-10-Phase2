const mongoose = require('mongoose');

const custAccSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, required: true },
    nReviews: { type: Number, required: true, default: 0 },
    pfp: {
        data: Buffer,
        contentType: String
    }
}, { collection: "customers" }); // Explicitly specify the collection name

const Customer = mongoose.model("Customer", custAccSchema); // Singular model name
module.exports = Customer;
