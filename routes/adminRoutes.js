const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const Customer = require('../models/customer');

// Get admin info
router.get('/', async (req, res) => {
    const admins = await Admin.find();
    res.json(admins);
});

// Get all reports
router.get('/reports', async (req, res) => {
    try {
        // Find all customers with reports
        const customersWithReports = await Customer.find({ 'reviews.reports': { $exists: true, $not: { $size: 0 } } });

        // Extract reports from each customer's reviews
        const allReports = customersWithReports.flatMap(customer => 
            customer.reviews.flatMap(review => 
                (review.reports || []).map(report => ({
                    customerId: customer._id,
                    reviewId: review._id,     
                    reportId: report._id,         
                    reportText: report.reportText,
                    dateReported: report.dateReported,
                    isResolved: report.isResolved || false
                }))
            )
        );

        res.json(allReports);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reports', error });
    }
});

// Resolve a report (mark it as resolved or delete the review/reply)
router.put('/reports/:reportId/resolve', async (req, res) => {
    const { reportId } = req.params;
    const { action } = req.body; // 'dismiss' or 'delete'

    try {
        // Find the customer containing the review with the report
        const customer = await Customer.findOne({ 'reviews.reports._id': reportId });

        if (!customer) return res.status(404).json({ message: 'Report not found' });

        let reportResolved = false;

        // Iterate through reviews to find and handle the report
        customer.reviews.forEach(review => {
            review.reports.forEach(report => {
                if (report._id.toString() === reportId) {
                    if (action === 'dismiss') {
                        report.isResolved = true;
                    } else if (action === 'delete') {
                        customer.reviews = customer.reviews.filter(r => r._id.toString() !== review._id.toString());
                    }
                    reportResolved = true;
                }
            });
        });

        if (!reportResolved) return res.status(404).json({ message: 'Report not found' });

        await customer.save();
        res.json({ message: 'Report resolved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resolving report', error });
    }
});

module.exports = router;
