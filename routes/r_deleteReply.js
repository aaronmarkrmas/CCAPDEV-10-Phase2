const express = require("express");
const router = express.Router();
const replyController = require("../controller/c_deleteReply");

// Route to delete a reply
router.delete("/delete-reply/:reviewId", replyController.deleteReply);

module.exports = router;
