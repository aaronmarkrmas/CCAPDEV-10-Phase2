const express = require("express");
const router = express.Router();
const editReplyController = require("../controller/cr_editReply");

router.get(
    "/restaurant/:restaurantId/review/:reviewId/reply/:replyId/edit-reply",
    editReplyController.getEditReplyPage
);

router.post(
    "/restaurant/:restaurantId/review/:reviewId/reply/:replyId/edit-reply",
    editReplyController.updateReply
);

module.exports = router;
