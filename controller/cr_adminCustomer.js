const Customer = require("../model/customer");
const Review = require("../model/review");
const Restaurant = require("../model/restaurant");

exports.getAdminCustomerProfile = async (req, res) => {
  try {
    const { adminId, customerId } = req.params;

    // Fetch user details
    const user = await Customer.findById(customerId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Fetch reviews posted by this user
    const reviews = await Review.find({ customerEmail: user.email });

    console.log("Reviews found:", reviews); // Debugging

    // Fetch all restaurants
    const restaurants = await Restaurant.find({});

    console.log("Restaurants fetched:", restaurants); // Debugging

    // Attach restaurant names to reviews
    const reviewsWithRestaurants = reviews.map((review) => {
      // Find the restaurant where _id (email) matches review.restaurantId
      const matchingRestaurant = restaurants.find(restaurant => restaurant._id === review.restaurantId);
  
      // Get the restoName if found, otherwise set a default value
      const restaurantName = matchingRestaurant ? matchingRestaurant.restoName : "Unknown Restaurant";
  
      console.log(`Review ID: ${review._id}, Restaurant ID: ${review.restaurantId}, Matched Name: ${restaurantName}`);
  
      return {
          ...review.toObject(),
          restaurantName
      };
    });

    console.log("Final Reviews with Restaurant Names:", reviewsWithRestaurants);

    // Render page with updated reviews
    res.render("adminCustomer_view", {
      adminId,
      user,
      reviews: reviewsWithRestaurants
    });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Server error loading user profile.");
  }
};


// Optionally handle deactivation
exports.deactivateCustomer = async (req, res) => {
  try {
    const { adminId, customerId } = req.params;
    await Customer.findByIdAndDelete(customerId);

    // Optionally delete user’s reviews as well
    // await Review.deleteMany({ customerEmail: user.email });

    res.redirect(`/admin/${adminId}/search`);
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).send("Server error deactivating user.");
  }
};
