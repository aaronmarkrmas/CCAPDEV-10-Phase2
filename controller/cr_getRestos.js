const { restaurants: Restaurant } = require('../model/restaurant');

exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find(); 
        res.render('homepage', { restaurants }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching restaurants");
    }
};
