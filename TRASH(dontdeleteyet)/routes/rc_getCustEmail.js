const express = require('express');
const router = express.Router();
const customerController = require('../controllers/cc_getCustEmail');

// Check if email exists
router.get('/:email', customerController.checkEmailExists);

module.exports = router;
