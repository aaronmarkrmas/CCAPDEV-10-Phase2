const { Restaurant } = require('../model/restaurant');

// GET: Render edit profile page
exports.getEditProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const restaurant = await Restaurant.findOne({ email });

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.render("editRestoProfile", { restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load restaurant profile" });
    }
};

// POST: Update restaurant profile
exports.updateProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const { restoName, password, phone, description, location } = req.body;

        // Find restaurant by email
        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Update fields if they are provided
        if (restoName?.trim()) restaurant.restoName = restoName;
        if (password?.trim()) restaurant.password = password;
        if (phone?.trim()) restaurant.phone = phone;
        if (description?.trim()) restaurant.description = description;
        if (location?.trim()) restaurant.location = location;
        if (req.file) restaurant.pfp = req.file.filename;

        await restaurant.save();

        // Redirect back to edit form
        res.redirect(`/restaurant/${email}/updateProfile`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update restaurant profile" });
    }
};
