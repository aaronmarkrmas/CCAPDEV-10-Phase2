const { Restaurant } = require('../CCAPDEV-10-Phase2/model/restaurant');

exports.updateProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const { restoName, password, phone, description, location } = req.body;

        // find restaurant by email
        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        if (restoName?.trim()) restaurant.restoName = restoName;
        if (password?.trim()) restaurant.password = password;
        if (phone?.trim()) restaurant.phone = phone;
        if (description?.trim()) restaurant.description = description;
        if (location?.trim()) restaurant.location = location;
        if (req.file) restaurant.pfp = req.file.filename; 

        await restaurant.save();

        res.render("restoProfile", { restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update restaurant profile" });
    }
};
