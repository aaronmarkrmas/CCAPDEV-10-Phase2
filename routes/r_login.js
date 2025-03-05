const express = require("express");
const router = express.Router();
const loginController = require("../controllers/cr_login");

// Route to check if an email exists in any model
router.get("/login/check-email", loginController.checkEmail);

// Route to handle login submission (POST request)
router.post("/login", loginController.handleLogin);

module.exports = router;
