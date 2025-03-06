const express = require("express");
const router = express.Router();
const loginController = require("../controller/cr_login");

// Route to render the login page
router.get("/login", loginController.getLoginPage);

// Route to handle user authentication
router.post("/login", loginController.authenticateUser);

module.exports = router;