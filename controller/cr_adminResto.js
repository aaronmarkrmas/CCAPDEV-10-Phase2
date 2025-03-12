// controllers/adminRestaurantController.js

const Restaurant = require('../model/restaurant');
const Review = require('../model/review');

/**
 * GET /admin/:adminId/restaurant/:restaurantId
 * - Fetch and display a restaurant profile (including its reviews).
 */
exports.getRestaurantProfile = async (req, res) => {
  try {
    const { adminId, restaurantId } = req.params;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      console.log("Restaurant not found:", restaurantId);
      return res.status(404).send('Restaurant not found');
    }

    // Get all reviews for this restaurant
    const reviews = await Review.find({ restaurantId });

    // Calculate average rating
    let averageRating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      averageRating = (sum / reviews.length).toFixed(1);
    }

    // debugging
    console.log("\n===== Restaurant Details =====");
    console.log("Email (_id):", restaurant._id);
    console.log("Name:", restaurant.restoName);
    console.log("Phone:", restaurant.phone);
    console.log("Description:", restaurant.description);
    console.log("Tags:", restaurant.tags);
    console.log("Number of Reviews:", restaurant.nReviews);
    console.log("Average Rating:", restaurant.rating);
    console.log("Location:", restaurant.location);
    
    console.log("==============================\n");

    // debugging
    console.log("Total Reviews Found:", reviews.length);
    reviews.forEach((review, index) => {
      console.log(`\nReview #${index + 1}:`);
      console.log("Title:", review.reviewTitle);
      console.log("Rating:", review.rating);
      console.log("Customer Email:", review.customerEmail);
      console.log("Review Text:", review.reviewText);
      
    });

    
    res.render('restoAdmin_view', {
      adminId,         // So the template knows which admin is viewing
      restaurant,      // Restaurant data
      reviews,         // All reviews for that restaurant
      averageRating,   // Pre-calculated average rating
    });

  } catch (error) {
    console.error("Error fetching restaurant profile:", error);
    res.status(500).send('Server Error');
  }
};

/**
 * POST /admin/:adminId/restaurant/:restaurantId/deactivate
 * - Deactivate (delete) a restaurant from DB.
 */
exports.deactivateRestaurant = async (req, res) => {
  try {
    const { adminId, restaurantId } = req.params;

    // Delete the restaurant from the database
    await Restaurant.findByIdAndDelete(restaurantId);

    // (Optional) Also remove any reviews for that restaurant:
    // await Review.deleteMany({ restaurantId });

    console.log(`Restaurant ${restaurantId} deactivated by Admin ${adminId}`);

    // Redirect back to the admin search page
    res.redirect(`/admin/${adminId}/search`);
  } catch (error) {
    console.error("Error deactivating restaurant:", error);
    res.status(500).send('Server Error');
  }
};
