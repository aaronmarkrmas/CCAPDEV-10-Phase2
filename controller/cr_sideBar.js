const { restaurants } = require("../model/restaurant");

// Handle profile redirection
exports.viewProfile = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(`Fetching profile for: ${email}`);

        const restaurant = await restaurants.findOne({ _id: email });

        if (!restaurant) {
            console.log("Restaurant not found!");
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Convert tags from a string to an array for better handling in EJS
        const tagsArray = restaurant.tags.split(",").map(tag => tag.trim());

        // Prepare data for frontend rendering
        res.render("restoProfile", { 
            restaurant,
            tags: tagsArray,
        });
    } catch (error) {
        console.error("Error fetching restaurant profile:", error);
        res.status(500).json({ error: "Failed to load restaurant profile" });
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ error: "Logout failed" });
        }
        res.redirect("/loginPage");
    });
};
