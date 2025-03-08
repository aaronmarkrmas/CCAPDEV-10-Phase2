const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const cr_restoSignup = require("../controller/cr_restoSignup"); 
const router = express.Router();

const storage = new GridFsStorage({
    url: "mongodb+srv://CCAPDEV-10:Bites10@ccapdev-10.ooopl.mongodb.net/CCAPDEV-10",
    file: (req, file) => ({
        filename: file.originalname,
        bucketName: "uploads",
    }),
});
const upload = multer({ storage });

router.get("/restoSignup", cr_restoSignup.getSignupPage);
router.post("/restoSignup", upload.single("profilePic"), cr_restoSignup.handleSignup);

module.exports = router;
