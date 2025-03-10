const express = require("express");
const router = express.Router();
const searchUsernameController = require("../controller/cr_search_username");

router.get("/search_username", searchUsernameController.getSearchUsernamePage);

module.exports = router;
