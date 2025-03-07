const { restaurants: Restaurant } = require('../model/restaurant');
const { users: user } = require('../model/customer');


exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find(); 
        res.render('homepage', { restaurants }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching restaurants");
    }
};
