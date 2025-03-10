const customers = require("../model/customer");
const restaurants = require("../model/restaurant");
const admins = require("../model/admin");

exports.getLoginPage = (req, res) => {
    res.render("login");
};

exports.authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });

        let user = null;
        let userType = null;

        console.log(`🔍 Checking for email: "${email}"`);

        // Check if it's a customer (search by `email`)
        user = await customers.findOne({ email });
        if (user) userType = "customer";

        // Check if it's a restaurant (search by `email`, not `_id`)
        if (!user) {
            user = await restaurants.findOne({ email });  // FIX: Search by email
            if (user) userType = "restaurant";
        }

        // Check if it's an admin (search by `_id`)
        if (!user) {
            user = await admins.findOne({ _id: email });
            if (user) userType = "admin";
        }

        if (!user) {
            console.log(`❌ User not found for email: "${email}"`);
            return res.status(404).json({ error: "Email not found" });
        }

        console.log(`✅ User found: "${user.email || user._id}" (${userType})`);

        // Trim passwords to avoid whitespace mismatches
        const inputPassword = password.trim();
        const storedPassword = user.password.trim();

        console.log("🔑 Inputted Password:", inputPassword);
        console.log("🔒 Stored Password:", storedPassword);

        if (inputPassword !== storedPassword) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Store session data properly
        req.session.user = {
            email: user.email, // Use email for all user types
            _id: user._id, // Store _id for restaurants/admins
            userType,
        };

        console.log("💾 Stored in session:", req.session.user);

        res.json({ success: true, email: req.session.user.email, _id: req.session.user._id, userType });
    } catch (error) {
        console.error("❗ Authentication error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
