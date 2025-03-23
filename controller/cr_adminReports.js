

// Fetch reports page
const Report = require("../model/report");
const Customer = require("../model/customer"); // 👈 Add this if not already

exports.getAdminReportsPage = async (req, res) => {
  try {
    const reports = await Report.find({ isResolved: false });

    // Enrich each report with reporter's username
    const enrichedReports = await Promise.all(
      reports.map(async (report) => {
        const reporter = await Customer.findOne({ email: report.reporterEmail });

        return {
          ...report.toObject(), // spread original report fields
          reporterUsername: reporter?.username || "Unknown",
        };
      })
    );

    res.render("adminReports", {
      reports: enrichedReports,
      adminId: req.params.adminId,
    });
  } catch (err) {
    console.error("❌ Error fetching reports:", err);
    res.status(500).send("Error fetching reports.");
  }
};


// Resolve a report
exports.resolveReport = async (req, res) => {
  try {
      await Report.findByIdAndUpdate(req.params.id, { isResolved: true });
      res.redirect(`/admin/${req.params.adminId}/reports`);
  } catch (err) {
      res.status(500).send("Error resolving report.");
  }
};


exports.getResolvedReports = async (req, res) => {
  try {
    const resolvedReports = await Report.find({ isResolved: true });

    res.render("adminViewResolved", {
      reports: resolvedReports,
      adminId: req.params.adminId
    });
  } catch (err) {
    console.error("Error fetching resolved reports:", err);
    res.status(500).send("Server error loading resolved reports.");
  }
};
