const express = require('express');
const router = express.Router();
const { upload } = require('../main');
const restaurantController = require('../controllers/cr_editRestoProfile');

// edit restaurant profile
router.put('/:email', upload.single('profilePhoto'), restaurantController.editRestaurantProfile);

module.exports = router;
