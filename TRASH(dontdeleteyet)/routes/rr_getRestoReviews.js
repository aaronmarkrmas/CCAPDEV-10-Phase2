const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/cr_getRestoReviews');

// get all review IDs for a restaurant
router.get('/getRestoReviews/:email', reviewController.getRestoReviews);

module.exports = router;
