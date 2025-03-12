const express = require("express");
const multer = require("multer");
const { handleCustomerSignup } = require("../controller/cr_custoSignup");

const router = express.Router();
const upload = multer();

router.get("/customerSignup", (req, res) => {
    res.render("custoSignup", { errors: null }); 
});

router.post("/customerSignup", upload.single("pfp"), handleCustomerSignup);

module.exports = router;
