const { Restaurant } = require('../CCAPDEV-10-Phase2/model/restaurant');

// check if a restaurant email already exists
exports.checkEmailExists = async (req, res) => {
    try {
        const { email } = req.params;

        // basic email format validation (avoid unnecessary queries)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const existingRestaurant = await Restaurant.findOne({ email });

        res.status(200).json({ exists: existingRestaurant ? true : false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking email availability' });
    }
};
