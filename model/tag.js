const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    _id: { type: String, required: true } //tag name
});

module.exports = {
    tags: mongoose.model('tags', tagSchema)
};