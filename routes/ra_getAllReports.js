const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ca_getAllReports'); 

// get all reports
router.get('/getAllReports', reportController.getAllReports);

module.exports = router;
