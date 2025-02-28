const express = require('express');
const router = express.Router();
const { Customer } = require('../CCAPDEV-10-Phase2/model/customer');

// check if email exists
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const existingCustomer = await Customer.findOne({ email });
        res.status(200).json({ exists: !!existingCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking email availability' });
    }
});

module.exports = router;
