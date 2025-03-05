const express = require("express");
const router = express.Router();
const sidebarController = require("../controller/cr_sideBar");

// Route to view profile
router.get("/:email/profile", sidebarController.viewProfile);

// Route to logout
router.get("/restoLogin", sidebarController.logout);

module.exports = router;
