const Restaurant = require("../model/restaurant");
const fs = require('fs');

exports.getEditProfile = async (req, res) => {
    try {
        const { email } = req.params;

        const restaurant = await Restaurant.findOne({ _id: email }); 

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


// Handle updating the restaurant profile, including profile picture
exports.updateProfile = async (req, res) => {
    try {
        const email = req.params.email;

        // Find the restaurant by email
        const restaurant = await Restaurant.findById(email);
        
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Update profile picture if it's provided
        if (req.file) {
            console.log("Received file:", req.file);
            console.log("Received file buffer:", req.file.buffer);  // Now, this should have the image buffer
            restaurant.pfp = {
                data: req.file.buffer,  // Store image as binary data in MongoDB
                contentType: req.file.mimetype  // Store MIME type
            };
        }

        // Update other restaurant fields
        restaurant.restoName = req.body.restoName || restaurant.restoName;
        restaurant.description = req.body.description || restaurant.description;
        restaurant.phone = req.body.phone || restaurant.phone;
        restaurant.location = req.body.location || restaurant.location;
        restaurant.password = req.body.password || restaurant.password;

        // Log before saving to check if the image data is correctly set
        console.log("Profile data to be saved:", restaurant.pfp);

        // Save the updated restaurant
        await restaurant.save();

        // Redirect back to the restaurant profile page
        res.redirect(`/restaurant/${email}/profile`);
    } catch (error) {
        console.error("Error updating restaurant profile:", error);
        res.status(500).json({ error: "An error occurred while updating the profile" });
    }
};
