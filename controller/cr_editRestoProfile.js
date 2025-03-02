const { restaurants } = require('../model/restaurant');

exports.getEditProfile = async (req, res) => {
    try {
        const { email } = req.params;

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

exports.updateProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const { restoName, password, phone, description, location } = req.body;

        console.log("Updating profile for:", email);
        console.log("Received File in Controller:", req.file); // Debugging

        const updatedRestaurant = await restaurants.findOneAndUpdate(
            { _id: email },  // Find by email (_id)
            {
                ...(restoName && { restoName }),
                ...(password && { password }),
                ...(phone && { phone }),
                ...(description && { description }),
                ...(location && { location })
            },
            { new: true } // Return the updated document
        );

        if (!updatedRestaurant) {
            console.log("Restaurant not found!");
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // ✅ If a new profile picture is uploaded, update it separately
        if (req.file) {
            updatedRestaurant.pfp = {
                data: req.file.id,  // Ensure this is defined
                contentType: req.file.mimetype
            };
            await updatedRestaurant.save();
        }

        console.log("Profile updated successfully:", updatedRestaurant);

        // Redirect back to edit page
        res.redirect(`/restaurant/${updatedRestaurant._id}/updateProfile`);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Failed to update restaurant profile" });
    }
};