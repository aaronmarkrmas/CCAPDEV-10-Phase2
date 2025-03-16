const mongoose = require('mongoose');

const deactivatedAccSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now } 
}, { collection: "deactivatedAccounts" });

const DeactivatedAccount = mongoose.models.DeactivatedAccount || mongoose.model("DeactivatedAccount", deactivatedAccSchema);

module.exports = DeactivatedAccount;
