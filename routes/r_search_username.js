const express = require("express");
const router = express.Router();
const searchUsernameController = require("../controller/cr_search_username");

router.get("/searchusername", searchUsernameController.getSearchUsernamePage);

module.exports = router;
