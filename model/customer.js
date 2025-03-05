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

module.exports = {
    customers: mongoose.model('customers', custAccSchema)
};
