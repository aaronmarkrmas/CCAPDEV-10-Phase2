const express = require("express");
const router = express.Router();
const customerProfileController = require("../controller/cr_customerProfile");

router.get("/:email/customerProfile", customerProfileController.viewCustomerProfile);

module.exports = router;
