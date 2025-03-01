const express = require('express');
const router = express.Router();
const { upload } = require('../main'); // Middleware for file uploads
const restaurantController = require('../controllers/cr_createResto'); 

// create new restaurant
router.post('/create', upload.single('profilePhoto'), restaurantController.createRestaurant);

module.exports = router;
