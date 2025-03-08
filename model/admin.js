const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = {
    admins: mongoose.model('admins', adminSchema)
};

const Admin = mongoose.model("Admin", adminSchema); 
module.exports = Admin; 