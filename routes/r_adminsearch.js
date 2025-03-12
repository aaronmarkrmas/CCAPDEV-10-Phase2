// routes/r_adminSearch.js
const express = require("express");
const router = express.Router();
const adminSearchController = require("../controller/cr_adminSearch");

router.get("/admin/:adminId/search", adminSearchController.getAdminSearchPage);
router.post("/admin/:adminId/search", adminSearchController.postAdminSearch);

module.exports = router;
