const express = require("express");
const router = express.Router();
const reviewController = require("../controller/c_getRestoReviews");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Store uploaded files in /uploads directory


// Route to submit a review
router.post("/review", upload.array("media", 5), reviewController.postReview);

// Route to get reviews for a specific restaurant
router.get("/reviews/:restaurantId", reviewController.getReviewsByRestaurant);

module.exports = router;
