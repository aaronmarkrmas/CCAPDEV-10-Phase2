const Report = require('../model/report'); // Import the Report model

exports.getReports = async (req, res) => {
    const { adminemail, restoemail } = req.params;  // Assuming you pass admin and resto emails in the URL
    try {
        // Fetch all unresolved reports from the database
        const reports = await Report.find({ isResolved: false });  // Filter by unresolved reports

        console.log("Fetched Reports:", reports); // Log the fetched reports for debugging

        if (reports.length === 0) {
            return res.render('adminReportsTable', { reports: [], message: 'No unresolved reports found.' });
        }

        const formattedReports = reports.map(report => ({
            reporterUsername: report.reporterUsername,
            postId: report._id,  // Assuming the Post ID is the report's ID or another field
            reason: report.reason || 'No reason specified',
            dateReported: report.dateReported.toLocaleDateString(),  // Formatting the date
            isResolved: report.isResolved ? 'Resolved' : 'Pending'
        }));

        // Pass the formatted reports data, admin email, and restaurant email to the EJS view
        res.render('adminReportsTable', { 
            reports: formattedReports, 
            adminemail: adminemail, 
            restoemail: restoemail 
        });
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Error fetching reports" });
    }
};
