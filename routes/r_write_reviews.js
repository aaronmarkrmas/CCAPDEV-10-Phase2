const express = require("express");
const router = express.Router();
const c_write_reviews = require("../controller/c_write_reviews");
const { upload } = require("../main"); // ✅ Import from server.js

router.get("/:email/profile/:restaurantId/write", c_write_reviews.viewProfile);

router.post("/:email/profile/:restaurantId/write", upload.array("media", 5), c_write_reviews.postReview);


module.exports = router;