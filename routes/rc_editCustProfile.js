const express = require('express');
const router = express.Router();
const { upload } = require('../main');
const { Customer } = require('../CCAPDEV-10-Phase2/model/customer');

// edit customer profile
router.put('/:email', upload.single('profilePhoto'), async (req, res) => {
    try {
        const { email } = req.params;
        const { newEmail, username, password, bio } = req.body;

        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        if (newEmail !== undefined && newEmail !== '') {
            const emailExists = await Customer.findOne({ email: newEmail });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already in use' });
            }
            customer.email = newEmail;
        }

        if (username !== undefined && username !== '') {
            const usernameExists = await Customer.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({ error: 'Username already in use' });
            }
            customer.username = username;
        }

        if (password !== undefined && password !== '') customer.password = password;
        if (bio !== undefined && bio !== '') customer.bio = bio;
        if (req.file) customer.pfp = req.file.filename; // Update profile photo if provided

        await customer.save();
        res.status(200).json({ message: 'Profile updated successfully', customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update customer profile' });
    }
});

module.exports = router;
