const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/cr_getRestos');

router.get('/', restaurantController.getRestaurants);

module.exports = router;
