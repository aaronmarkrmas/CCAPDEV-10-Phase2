//http://localhost:3000/restaurant/sample@restaurant.com/updateProfile
const express = require("express");
const router = express.Router();
const { upload } = require("../main"); 
const restaurantController = require("../controller/cr_editRestoProfile");

// GET route to show the edit profile page
router.get("/:email/updateProfile", restaurantController.getEditProfile);

// POST route to update the restaurant profile
router.post("/:email/updateProfile", (req, res, next) => {
    req.app.locals.upload.single("pfp")(req, res, next);
}, restaurantController.updateProfile);

module.exports = router;
