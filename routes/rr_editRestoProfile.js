const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/cr_editRestoProfile');

// edit restaurant profile
router.post("/restaurant/:email/updateProfile", restaurantController.updateProfile);



module.exports = router;
