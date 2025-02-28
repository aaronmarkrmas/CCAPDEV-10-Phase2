const express = require('express');
const router = express.Router();
const { upload } = require('../main');
const restaurantController = require('../controllers/cr_editRestoProfile');

// edit restaurant profile
router.post("/restaurant/:email/updateProfile", restaurantController.updateProfile);

module.exports = router;
