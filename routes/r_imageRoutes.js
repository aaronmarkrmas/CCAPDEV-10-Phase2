// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../model/restaurant'); 

// GET /images/restaurants/:restaurantId
router.get('/restaurants/:restaurantId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant || !restaurant.pfp || !restaurant.pfp.data) {
      return res.status(404).send('No profile picture found');
    }

    // Set the content type (e.g. "image/png" or "image/jpeg")
    res.set('Content-Type', restaurant.pfp.contentType);
    // Send the binary data directly
    res.send(restaurant.pfp.data);
  } catch (err) {
    console.error('Error fetching profile pic:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
