const { Customer } = require('../CCAPDEV-10-Phase2/model/customer');

exports.checkUsernameExists = async (req, res) => {
    try {
        const { username } = req.params;
        const existingCustomer = await Customer.findOne({ username });
        res.status(200).json({ exists: !!existingCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking username availability' });
    }
};
