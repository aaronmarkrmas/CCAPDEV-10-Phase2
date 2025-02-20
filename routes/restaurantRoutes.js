const express = require('express');
const router = express.Router();
const Restaurant = require('../model/restaurant');

/*
app.get('/logout', (req, res) => {
  req.session.destroy(); // Ends the session
  res.redirect('/login'); // Redirects to the login page
});
*/


// Get all restaurants
router.get('/', async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

// Create a new restaurant
router.post('/create', async (req, res) => {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
});

// Add a reply to a review
router.post('/replies/create', async (req, res) => {
    const { restoName, reviewId, replyText } = req.body;
    const restaurant = await Restaurant.findOne({ restoName });

    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    restaurant.replies.push({ reviewId, replyText });
    await restaurant.save();

    res.status(201).json(restaurant);
});

module.exports = router;
