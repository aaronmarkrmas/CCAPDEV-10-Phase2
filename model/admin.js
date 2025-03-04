const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = {
    admins: mongoose.model('admins', adminSchema)
};