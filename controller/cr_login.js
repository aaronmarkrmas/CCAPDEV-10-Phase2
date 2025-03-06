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

        let user = await customers.findOne({ email });
        let userType = "customer";

        if (!user) {
            user = await restaurants.findOne({ _id: email });
            userType = "restaurant";
        }

        if (!user) {
            user = await admins.findOne({ _id: email });
            userType = "admin";
        }

        if (!user) return res.status(404).json({ error: "Email not found" });

        // If password is provided, handle login
        if (password) {
            console.log("Inputted Password (Plain Text):", password); // Log raw input
            console.log("Stored Password Hash:", user.password); // Log hashed password from DB

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log("Password mismatch! ❌");
                return res.status(401).json({ error: "Incorrect password" });
            }

            console.log("Password matched! ✅");

            req.session.user = {
                email: user.email || user._id, // Ensure email consistency
                userType: userType
            };

            return res.json({ success: true, userType: userType });
        }

        // If no password is provided, just return email details
        res.json({ email: user.email || user._id, userType: userType });

    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

