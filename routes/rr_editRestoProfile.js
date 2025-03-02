//http://localhost:3000/restaurant/sample@restaurant.com/updateProfile

const express = require("express");
const router = express.Router();
const { initGridFS } = require("../main"); 
const restaurantController = require("../controller/cr_editRestoProfile");
let upload;
initGridFS.then(({ upload: initializedUpload }) => {
    upload = initializedUpload;
}).catch(err => {
    console.error("Error initializing GridFS:", err);
});

const ensureUploadInitialized = (req, res, next) => {
    if (!upload) {
        return res.status(500).json({ error: "File upload service not initialized yet. Try again later." });
    }
    req.app.locals.upload = upload;
    next();
};

// GET route to show the edit profile page  
router.get("/:email/updateProfile", restaurantController.getEditProfile);

// POST route to update the restaurant profile  
router.post("/:email/updateProfile", ensureUploadInitialized, (req, res, next) => {
    req.app.locals.upload.single("pfp")(req, res, next);
}, restaurantController.updateProfile);



module.exports = router;
