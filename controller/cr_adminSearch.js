const Customer = require("../model/customer");
const Restaurant = require("../model/restaurant");

// GET: Load Admin Search Page
exports.getAdminSearchPage = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.userType !== "admin") {
      return res.redirect("/login");
    }

    const restaurants = await Restaurant.find({});
    const adminId = req.session.user._id;

    res.render("adminSearchPage", {
      adminId,
      restaurants,
      searchResults: null
    });

  } catch (error) {
    console.error("Error fetching admin search page:", error);
    res.status(500).send("Server error loading admin search page.");
  }
};

// POST: Handle Search Query
exports.postAdminSearch = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.userType !== "admin") {
      return res.redirect("/login");
    }

    const adminId = req.session.user._id;
    const searchQuery = (req.body.search || "").trim();

    const users = await Customer.find({
      username: { $regex: searchQuery, $options: "i" }
    });

    // Process profile pictures into base64 format
    const processedUsers = users.map(user => {
      let base64Image = null;
      if (user.pfp && user.pfp.data) {
        base64Image = `data:${user.pfp.contentType};base64,${user.pfp.data.toString("base64")}`;
      }

      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        pfp: base64Image
      };
    });

    const allRestaurants = await Restaurant.find({});
    const foundRestaurants = await Restaurant.find({
      restoName: { $regex: searchQuery, $options: "i" }
    });

    res.render("adminSearchPage", {
      adminId,
      restaurants: allRestaurants, // used to show full list regardless of search
      searchResults: {
        users: processedUsers,
        restaurants: foundRestaurants
      }
    });

  } catch (err) {
    console.error("Error in admin search:", err);
    res.status(500).send("Search failed");
  }
};
