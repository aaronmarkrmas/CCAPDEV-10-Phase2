const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    // Define your schema fields here
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

module.exports = Report;
