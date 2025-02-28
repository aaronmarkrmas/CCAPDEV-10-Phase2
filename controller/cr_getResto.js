const { Restaurant } = require('../CCAPDEV-10-Phase2/model/restaurant');

exports.getRestaurantDetails = async (req, res) => {
    try {
        const { email } = req.params;
        const restaurant = await Restaurant.findOne({ email }).select('-password');

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve restaurant details' });
    }
};
