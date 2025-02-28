const express = require('express');
const router = express.Router();
const customerController = require('../controllers/cc_getCustUsername'); // Import controller

// check if username exists
router.get('/check-username/:username', customerController.checkUsernameExists);

module.exports = router;
