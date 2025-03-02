const { restaurants } = require('../model/restaurant');

exports.getEditProfile = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(`Fetching restaurant with email: ${email}`); 

        const restaurant = await restaurants.findOne({ _id: email }); 

        if (!restaurant) {
            console.log("Restaurant not found!"); 
            return res.status(404).json({ error: "Restaurant not found" });
        }

        console.log("Restaurant data fetched:", restaurant); 

        res.render("editRestoProfile", { restaurant });
    } catch (error) {
        console.error("Error loading restaurant profile:", error);
        res.status(500).json({ error: "Failed to load restaurant profile" });
    }
};

// POST: Update restaurant profile
exports.updateProfile = async (req, res) => {
    try {
        const { email } = req.params; 
        const { restoName, password, phone, description, location } = req.body;

        console.log(`Updating profile for: ${email}`); 

        // Find restaurant by email (which is stored as `_id`)
        const restaurant = await restaurants.findOne({ _id: email });
        if (!restaurant) {
            console.log("Restaurant not found!");
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Update fields only if provided
        if (restoName?.trim()) restaurant.restoName = restoName;
        if (password?.trim()) restaurant.password = password;
        if (phone?.trim()) restaurant.phone = phone;
        if (description?.trim()) restaurant.description = description;
        if (location?.trim()) restaurant.location = location;
        if (req.file) restaurant.pfp = req.file.filename; 

        await restaurant.save();
        console.log("Profile updated successfully!"); 

        // Redirect back to edit page
        res.redirect(`/restaurant/${email}/updateProfile`);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Failed to update restaurant profile" });
    }
};
