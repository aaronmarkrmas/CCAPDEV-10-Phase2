const express = require('express');
const router = express.Router();

const restaurantController = require('../controller/cr_editRestoProfile');


// GET route to display the edit form
router.get("/restaurant/:email/updateProfile", restaurantController.getEditProfile);

// POST route to update restaurant profile
router.post("/restaurant/:email/updateProfile", restaurantController.updateProfile);

module.exports = router;