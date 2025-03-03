const express = require("express");
const router = express.Router();
const reviewController = require("../controller/c_getRestoReviews");

// GET route to fetch reviews for a restaurant
router.get("/:email/reviews", reviewController.getReviews);

module.exports = router;
