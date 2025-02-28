const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/cr_getResto');

// get restaurant details (excluding password)
router.get('/getResto/:email', restaurantController.getRestaurantDetails);

module.exports = router;
