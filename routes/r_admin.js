const express = require("express");
const router = express.Router();
const adminTagsController = require("../controller/cr_adminTags");

// Fetch Manage Tags Page
router.get("/admin/:adminId/tags", adminTagsController.getManageTagsPage);

// Add Tag
router.post("/admin/tags/add", adminTagsController.addTag);

// Delete Tag
router.post("/admin/tags/delete", adminTagsController.deleteTag);

module.exports = router;
