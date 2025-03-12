const express = require("express");
const router = express.Router();
const upload = require("../main").upload;
const customerController = require("../controller/cr_editCustomerProfile");

// GET route to show the edit profile page  
router.get("/:email/updateProfile", customerController.getEditProfile);

// POST route to update the customer profile  
router.post("/:email/updateProfile", upload.single("pfp"), customerController.updateProfile);

// POST route for deactivating the account
router.post("/:email/deactivate", customerController.deactivateAccount);


module.exports = router;
