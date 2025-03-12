const express = require('express');
const router = express.Router();

// Import Controllers
const adminRestaurantController = require('../controller/cr_adminResto');
const adminReviewController = require('../controller/cr_adminReviewDelete.js');
const Restaurant = require('../model/restaurant'); // Import Model for profile pictures

// ✅ FIX: Route to Serve Profile Pictures
router.get('/profile-pics/:restaurantId', async (req, res) => {
  try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant || !restaurant.pfp || !restaurant.pfp.data) {
          return res.status(404).send('No profile picture found');
      }

      res.set('Content-Type', restaurant.pfp.contentType);
      res.send(restaurant.pfp.data); 
  } catch (err) {
      console.error('Error fetching profile pic:', err);
      res.status(500).send(err.message);
  }
});

// 1️⃣ **Restaurant-Specific Routes**
// ----------------------------------
// ✅ GET: Restaurant Profile (Admin View)
router.get("/admin/:adminId/restaurant/:restaurantId", 
  adminRestaurantController.getRestaurantProfile
);

// ✅ POST: Deactivate Restaurant
router.post('/admin/:adminId/restaurant/:restaurantId/deactivate',
  adminRestaurantController.deactivateRestaurant
);

// 2️⃣ **Review-Specific Routes**
// ------------------------------
// ✅ POST: Delete Review
router.post('/admin/:adminId/reviews/:reviewId/delete',
  adminReviewController.deleteReview
);

// ✅ Export Router
module.exports = router;
