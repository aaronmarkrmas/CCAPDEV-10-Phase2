const customers = require("../model/customer");
const restaurants = require("../model/restaurant");
const admins = require("../model/admin");
const deactivatedAcc = require("../model/deactivatedAcc");

exports.getLoginPage = (req, res) => {
    res.render("login");
};

exports.authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });

        let user = null;
        let userType = null;

        user = await customers.findOne({ email });
        if (user) userType = "customer";

        if (!user) {
            user = await restaurants.findOne({ _id: email });  
            if (user) userType = "restaurant";
        }

        if (!user) {
            user = await admins.findOne({ _id: email });
            if (user) userType = "admin";
        }

        if (!user) {
            return res.status(404).json({ error: "Email not found" });
        }

        if (userType === "customer") {
            const isDeactivated = await deactivatedAcc.findOne({ _id: user._id });
            if (isDeactivated) {
                return res.status(403).json({ error: "This account has been deactivated" });
            }
        }

        const inputPassword = password.trim();
        const storedPassword = user.password.trim();

        if (inputPassword !== storedPassword) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        req.session.user = {
            _id: user._id.toString(),  // Always store _id
            email: user.email || user._id.toString(), // Customers/Restaurants use `email`, admins use `_id`
            userType
          };
          
        console.log("Stored in session:", req.session.user); // Debugging

        return res.json({ 
            success: true, 
            userType, 
            email: user.email || user._id,
            _id: user._id
        });
        

        res.json({ success: true, email: req.session.user.email, _id: req.session.user._id, userType });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
