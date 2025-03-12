const express = require("express");
const router = express.Router();
const cr_editReview = require("../controller/cr_editReview");
const { upload } = require("../main");

router.get("/customer/:email/reviews/:reviewId/edit", cr_editReview.viewReviewForEdit);
router.post("/customer/:email/reviews/:reviewId/edit", upload.array("media", 5), cr_editReview.updateReview);

module.exports = router;
