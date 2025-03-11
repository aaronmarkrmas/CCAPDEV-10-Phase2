const mongoose = require('mongoose');

const deactivatedAccSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now } 
}, { collection: "deactivatedAccounts" }); 

const DeactivatedAccount = mongoose.model("DeactivatedAccount", deactivatedAccSchema); 
module.exports = DeactivatedAccount;
