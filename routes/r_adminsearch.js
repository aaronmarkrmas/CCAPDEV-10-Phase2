// routes/r_adminSearch.js
const express = require("express");
const router = express.Router();

const adminSearchController = require("../controller/cr_adminSearch");
const adminCustomerController = require("../controller/cr_adminCustomer");



router.get("/admin/:adminId/search", adminSearchController.getAdminSearchPage);
router.post("/admin/:adminId/search", adminSearchController.postAdminSearch);

// New route for viewing a customer's profile
router.get("/admin/:adminId/customer/:customerId", adminCustomerController.getAdminCustomerProfile);

// If you have a deactivate user feature:
router.post("/admin/:adminId/customer/:customerId/deactivate", adminCustomerController.deactivateCustomer);

module.exports = router;
