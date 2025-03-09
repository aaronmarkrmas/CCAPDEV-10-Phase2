const express = require('express');
const router = express.Router();
const reportController = require('../controller/ca_adminReportsTable');

// Route for fetching reports for a specific user based on email
router.get('/admin/reports/:email', reportController.getReports);

module.exports = router;
