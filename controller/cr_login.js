const customers = require("../models/customerModel");
const restaurants = require("../models/restaurantModel");
const admins = require("../models/adminModel");
const bcrypt = require("bcrypt");

exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ error: "Email is required" });

        let user = await customers.findOne({ email: email });
        let userType = "customer";

        if (!user) {
            user = await restaurants.findOne({ email: email });
            userType = "restaurant";
        }

        if (!user) {
            user = await admins.findOne({ email: email });
            userType = "admin";
        }

        if (!user) return res.status(404).json({ error: "Email not found" });

        res.json({ email: user.email, password: user.password, userType: userType });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await customers.findOne({ email });
        let userType = "customer";

        if (!user) {
            user = await restaurants.findOne({ email });
            userType = "restaurant";
        }

        if (!user) {
            user = await admins.findOne({ email });
            userType = "admin";
        }

        if (!user) return res.status(404).json({ error: "Email not found" });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

        // Store user session
        req.session.user = {
            email: user.email,
            userType: userType
        };

        res.json({ success: true, userType: userType });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
