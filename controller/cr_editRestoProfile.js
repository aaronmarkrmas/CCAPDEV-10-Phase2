const { Restaurant } = require('../CCAPDEV-10-Phase2/model/restaurant');

exports.editRestaurantProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const { newEmail, restoName, password, phone, description, tags } = req.body;
        const tagsArray = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : undefined;

        // Find restaurant by email
        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Check if new email is already in use
        if (newEmail && newEmail.trim() !== '') {
            const emailExists = await Restaurant.findOne({ email: newEmail });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            restaurant.email = newEmail;
        }

        // Update only non-empty fields
        if (restoName?.trim()) restaurant.restoName = restoName;
        if (password?.trim()) restaurant.password = password;
        if (phone?.trim()) restaurant.phone = phone;
        if (description?.trim()) restaurant.description = description;
        if (tagsArray) restaurant.tags = tagsArray;
        if (req.file) restaurant.pfp = req.file.filename;

        await restaurant.save();
        res.status(200).json({ message: 'Profile updated successfully', restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update restaurant profile' });
    }
};
