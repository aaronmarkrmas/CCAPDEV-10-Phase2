// File: routes/r_adminSettings.js
const express = require("express");
const router = express.Router();
const adminSettingsController = require("../controller/cr_adminSettings");
const adminReportsController = require("../controller/cr_adminReports");
const adminDetailedController = require("../controller/cr_adminDetailedReport");

const adminTagsController = require("../controller/cr_adminTags");

// Route to fetch the settings page
router.get("/admin/:adminId/settings", adminSettingsController.getAdminSettingsPage);

// Route to fetch the reports page
router.get("/admin/:adminId/reports", adminReportsController.getAdminReportsPage);

// Route to resolve a report
router.post("/admin/:adminId/reports/:id/resolve", adminReportsController.resolveReport);

// Fetch Manage Tags Page
router.get("/admin/:adminId/tags", adminTagsController.getManageTagsPage);

// Add Tag
router.post("/admin/tags/add", adminTagsController.addTag);

// Delete Tag
router.post("/admin/tags/delete", adminTagsController.deleteTag);
module.exports = router;

//Detailed View Page
router.get("/admin/:adminId/reports/detailed", adminDetailedController.getDetailedView);



router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send("Logout failed.");
      }
      res.render("suli"); // Render suli.ejs after logout
  });
});