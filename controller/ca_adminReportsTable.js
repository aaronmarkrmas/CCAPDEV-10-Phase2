const Report = require('../model/report');
const Customer = require('../model/customer'); // You need this to fetch usernames

exports.getReports = async (req, res) => {
    const { adminemail, restoemail } = req.params;

    try {
        const reports = await Report.find({ isResolved: false });

        if (reports.length === 0) {
            return res.render('adminReportsTable', {
                reports: [],
                message: 'No unresolved reports found.',
                adminemail,
                restoemail
            });
        }

        // Fetch reporter usernames for each report
        const formattedReports = await Promise.all(reports.map(async (report) => {
            const reporter = await Customer.findOne({ email: report.reporterEmail });

            return {
                reporterUsername: reporter?.username || 'Unknown',
                postId: report.postId,
                reason: report.reason || 'No reason specified',
                dateReported: report.dateReported.toLocaleDateString(),
                isResolved: report.isResolved ? 'Resolved' : 'Pending'
            };
        }));

        res.render('adminReportsTable', {
            reports: formattedReports,
            adminemail,
            restoemail
        });

    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Error fetching reports" });
    }
};
