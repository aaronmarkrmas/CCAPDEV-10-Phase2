const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    _id: { type: String, required: true } //tag name
});


const Tag = mongoose.model("Tag", tagSchema); 
module.exports = Tag; 