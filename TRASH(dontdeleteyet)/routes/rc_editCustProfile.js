const express = require('express');
const router = express.Router();
const { upload } = require('../main');
const customerController = require('../controllers/cc_editCustProfile'); 

// edit customer profile
router.put('/:email', upload.single('profilePhoto'), customerController.editCustomerProfile);

module.exports = router;
