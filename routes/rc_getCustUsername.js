const express = require('express');
const router = express.Router();
const { Customer } = require('../CCAPDEV-10-Phase2/model/customer');

// check if username exists
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const existingCustomer = await Customer.findOne({ username });
        res.status(200).json({ exists: !!existingCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking username availability' });
    }
});

module.exports = router;
