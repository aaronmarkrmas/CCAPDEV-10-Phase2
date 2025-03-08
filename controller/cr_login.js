const { customers } = require("../model/customer");
const { restaurants } = require("../model/restaurant");
const { admins } = require("../model/admin");
const bcrypt = require("bcrypt");

exports.getLoginPage = (req, res) => {
    res.render("login");
};

exports.authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });

        let user = null;
        let userType = null;

        // Search in Customers collection
        user = await customers.findOne({ email });
        if (user) userType = "customer";

        // If not found, search in Restaurants collection
        if (!user) {
            user = await restaurants.findOne({ _id: email });
            if (user) userType = "restaurant";
        }

        // If still not found, search in Admins collection
        if (!user) {
            user = await admins.findOne({ _id: email });
            if (user) userType = "admin";
        }

        if (!user) return res.status(404).json({ error: "Email not found" });

        // Compare plain text passwords
        console.log("Inputted Password:", password);
        console.log("Stored Password:", user.password);

        if (password !== user.password) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        req.session.user = {
            email: user.email || user._id,
            userType,
        };

        return res.json({ 
            success: true, 
            userType, 
            email: user.email, 
            _id: user._id 
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ error: "Server error" });
    }
};