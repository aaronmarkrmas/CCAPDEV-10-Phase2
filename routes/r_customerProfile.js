const express = require("express");
const router = express.Router();
const customerProfileController = require("../controller/cr_customerProfile");

// View customer profile
router.get("/:email/customerProfile", customerProfileController.viewCustomerProfile);

// Delete review route
router.delete("/:customerEmail/reviews/:reviewId/delete", customerProfileController.deleteReview);

module.exports = router;
