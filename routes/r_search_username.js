const express = require("express");
const router = express.Router();
const searchUsernameController = require("../controller/cr_search_username");

router.get("/:email/search_username", searchUsernameController.getSearchUsernamePage);  // Route for search_username

router.get("/profile/:username", searchUsernameController.viewProfile); // Route for viewing the user's profile

module.exports = router;
