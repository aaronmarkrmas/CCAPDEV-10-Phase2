const { restaurants: Restaurant } = require('../model/restaurant');
const { customers: Customer } = require('../model/customer');
const {tags:Tag} = require('../model/tag');

exports.getCustomerHomeFeed = async (req, res) => {
    const customerEmail = req.params.email; // get email
    const searchQuery = req.query.search || '';
    const tagFilter = req.query.tag || ''; // tag filter

    try {
        

        const customer = await Customer.findOne({ email: customerEmail}); //get customer by email
        if (!customer) {
            return res.status(500).json({ error: "Email n   ot found" });
        }

        let query = {};

        // Apply search filter if provided
        if (searchQuery) {
            query.restoName = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search
        }

        // Apply tag filter if provided
        if (tagFilter) {
            query.tags ={ $regex: new RegExp(`\\b${tagFilter}\\b`, 'i') }; // <-- Matches restaurants with the selected tag
        }


        const restaurants = await Restaurant.find(query); // Fetch restaurants with filters applied

        const tags = await Tag.find(); // get tags

        res.render('customer_homeFeed', { restaurants, email: customerEmail, username: customer.username, search:searchQuery, tags }); 

    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).send("Internal Server Error");
    }
};
