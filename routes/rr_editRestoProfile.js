const express = require('express');
const router = express.Router();
const { upload } = require('../main');
const { Restaurant } = require('../CCAPDEV-10-Phase2/model/restaurant');

// edit restaurant profile
router.put('/:email', upload.single('profilePhoto'), async (req, res) => {
    try {
        const { email } = req.params;
        const { newEmail, restoName, password, phone, description, tags } = req.body;
        const tagsArray = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : undefined;

        // id = email
        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // if emailExists == false, update email
        if (newEmail !== undefined && newEmail !== '') {
            const emailExists = await Restaurant.findOne({ email: newEmail });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            restaurant.email = newEmail;
        }

        // if field != NULL, update field
        if (restoName !== undefined && restoName !== '') restaurant.restoName = restoName;
        if (password !== undefined && password !== '') restaurant.password = password;
        if (phone !== undefined && phone !== '') restaurant.phone = phone;
        if (description !== undefined && description !== '') restaurant.description = description;
        if (tagsArray !== undefined) restaurant.tags = tagsArray;
        if (req.file) restaurant.pfp = req.file.filename; 

        await restaurant.save();
        res.status(200).json({ message: 'Profile updated successfully', restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update restaurant profile' });
    }
});

module.exports = router;
