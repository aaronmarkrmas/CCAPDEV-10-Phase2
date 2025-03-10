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

        if (!user) return res.status(404).json({ error: "Email not found" });

        
        const inputPassword = password.trim();
        const storedPassword = user.password.trim();

        console.log("Inputted Password:", inputPassword);
        console.log("Stored Password:", storedPassword);

        if (inputPassword !== storedPassword) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        
        req.session.user = {
            email: user.email || user._id, 
            userType,
        };

        console.log("Stored in session:", req.session.user); 

        return res.json({ 
            success: true, 
            userType, 
            email: user.email || user._id 
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
