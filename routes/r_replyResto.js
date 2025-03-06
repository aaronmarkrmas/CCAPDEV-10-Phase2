const express = require("express");
const router = express.Router();
const restoReplyController = require("../controller/c_replyResto");

// Route to display reply page
router.get("/restaurant/:restaurantId/review/:reviewId/reply", restoReplyController.getReplyPage);

// Route to submit reply
router.post("/restaurant/:restaurantId/review/:reviewId/submit-reply", restoReplyController.submitReply);

module.exports = router;
