const customers = require("../model/customer"); // Made consistent
const restaurants = require("../model/restaurant"); // Already consistent
const admins = require("../model/admin"); // Made consistent

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

        // Trim both passwords to remove any extra spaces
        const inputPassword = password.trim();
        const storedPassword = user.password.trim();

        console.log("Inputted Password:", inputPassword);
        console.log("Stored Password:", storedPassword);

        if (inputPassword !== storedPassword) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Store user session data
        req.session.user = {
            _id: user._id.toString(),  // Always store _id
            email: user.email || user._id.toString(), // Customers/Restaurants use `email`, admins use `_id`
            userType
          };
          
        console.log("Stored in session:", req.session.user); // Debugging

        return res.json({ 
            success: true, 
            userType, 
            email: user.email || user._id // Ensure correct email format
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
