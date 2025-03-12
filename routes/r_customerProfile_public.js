const express = require("express");
const router = express.Router();
const customerProfilePublicController = require("../controller/cr_customerProfile_public");

// Route to render the public customer profile page
router.get("/:currentUserEmail/:viewedUserEmail/customerProfilePublic", customerProfilePublicController.viewCustomerProfile);

// Route to report a review
router.post("/reportReview", customerProfilePublicController.reportReview);

module.exports = router;
