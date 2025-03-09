const express = require("express");
const router = express.Router();
const sidebarController = require("../controller/c_customerPOV_restoProfile");

router.get("/:restoEmail/profile", sidebarController.publicViewProfile);

router.get("/:email/profile/:restaurantId", sidebarController.loggedViewProfile);

module.exports = router;