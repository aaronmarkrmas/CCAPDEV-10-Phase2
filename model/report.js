const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    _id: String, 
    postId: { type: String, required: true }, 
    reporterEmail: { type: String, required: true },
    reason: { type: String, required: true },
    dateReported: { type: Date, default: Date.now }, 
    isResolved: { type: Boolean, default: false },
}, { collection: "reports" });

// Prevent model overwrite
const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

module.exports = Report;
