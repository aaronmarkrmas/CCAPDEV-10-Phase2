const Report = require("../model/Report");

// Fetch reports page
exports.getAdminReportsPage = async (req, res) => {
  try {
      const reports = await Report.find();
      res.render("adminReports", { reports, adminId: req.params.adminId });
  } catch (err) {
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
