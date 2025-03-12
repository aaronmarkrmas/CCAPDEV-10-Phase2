
const Restaurant = require("../model/restaurant");
const User = require("../model/customer");


exports.getAdminSearchPage = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.userType !== "admin") {
      return res.redirect("/login");
    }
    const restaurants = await Restaurant.find({});
    const adminId = req.session.user._id;
    res.render("adminSearchPage", {
      restaurants,
      searchResults: null,
      adminId
    });
  } catch (error) {
    console.error("Error fetching admin search page:", error);
    res.status(500).send("Server error loading admin search page.");
  }
};

exports.postAdminSearch = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.userType !== "admin") {
      return res.redirect("/login");
    }

    // Get adminId properly from session (not req.params)
    const adminId = req.session.user._id || req.session.user.email;
    
    // Trim search query
    const searchQuery = (req.body.search || "").trim();

    // Search users and restaurants
    const users = await User.find({
      username: { $regex: searchQuery, $options: "i" }
    });
    const foundRestaurants = await Restaurant.find({
      restoName: { $regex: searchQuery, $options: "i" }
    });

    // Render search results
    res.render("adminSearchPage", {
      adminId,  // Pass adminId properly
      restaurants: foundRestaurants, // Use search results directly
      searchResults: { users, restaurants: foundRestaurants }
    });

  } catch (error) {
    console.error("Error performing admin search:", error);
    res.status(500).send("Server error performing search.");
  }
};

