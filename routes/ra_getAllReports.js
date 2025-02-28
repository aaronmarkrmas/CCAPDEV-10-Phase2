const express = require('express');
const router = express.Router();
const { Report } = require('../CCAPDEV-10-Phase2/models/customer'); 

// get all reports
router.get('/getAllReports', async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
});

module.exports = router;
