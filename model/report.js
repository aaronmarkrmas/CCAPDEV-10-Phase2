const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    reporterUsername: { type: String, required: true },
    dateReported: { type: Date, required: true, default: Date.now },
    isResolved: { type: Boolean, required: true, default: false },
    reason: { type: String, required: true }
});

const Report = mongoose.model("Report", reportSchema); 
module.exports = Report;
