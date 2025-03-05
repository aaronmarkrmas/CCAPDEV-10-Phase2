const express = require('express');
const router = express.Router();
const accountypeController = require('../controller/cr_accounttype_creation'); 

router.get('/accounttype_creation', accountypeController.getAccounttype_creation); 

module.exports = router;