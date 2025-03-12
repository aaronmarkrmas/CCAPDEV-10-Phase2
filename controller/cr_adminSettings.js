// File: controller/cr_adminSettings.js
const Customer = require("../model/customer");
const Restaurant = require("../model/restaurant");

exports.getAdminSettingsPage = async (req, res) => {
    try {
        if (!req.session.user || req.session.user.userType !== "admin") {
            return res.redirect("/login");
        }

        const customerCount = await Customer.countDocuments({});
        const restaurantCount = await Restaurant.countDocuments({});
        const totalUsers = customerCount + restaurantCount;

        res.render("adminSettings", {
            adminId: req.session.user._id, // Ensure adminId comes from session
            customerCount,
            restaurantCount,
            totalUsers
        });
    } catch (error) {
        console.error("Error fetching settings data:", error);
        res.status(500).send("Server error loading admin settings.");
    }
};
