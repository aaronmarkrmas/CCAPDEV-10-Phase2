const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/cr_getRestoEmail');

// check if restaurant email exists
router.get('/:email', restaurantController.checkEmailExists);

module.exports = router;
