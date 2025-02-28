const { Report } = require('../CCAPDEV-10-Phase2/models/customer');

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
};
