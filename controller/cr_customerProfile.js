const Customer = require("../model/customer"); 
const Review = require("../model/review"); 
const Restaurant = require("../model/restaurant"); 

// View Customer Profile
exports.viewCustomerProfile = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(`Fetching customer profile for: ${email}`);

        const customer = await Customer.findOne({ email }, "email username bio pfp");
        if (!customer) {
            console.log("Customer not found!");
            return res.status(404).json({ error: "Customer not found" });
        }

        const profilePicture = customer.pfp && customer.pfp.data
            ? `data:${customer.pfp.contentType};base64,${customer.pfp.data.toString("base64")}`
            : "/images/default-user.png"; // Default profile picture

        // Fetch customer reviews
        const customerReviews = await Review.find({ customerEmail: email }).sort({ datePosted: -1 });

        // Fetch restaurant names for the reviews
        const restaurantIds = [...new Set(customerReviews.map(review => review.restaurantId))];
        const restaurantsData = await Restaurant.find(
            { _id: { $in: restaurantIds } }, 
            "_id name"
        );
        
        const restaurantNames = {};
        restaurantsData.forEach(restaurant => {
            restaurantNames[restaurant._id] = restaurant.name;
        });

        // Process media data in reviews
        const processedReviews = customerReviews.map(review => {
            const processedMedia = review.media.map(mediaItem => {
                if (mediaItem.data) {
                    return `data:${mediaItem.contentType};base64,${mediaItem.data.toString("base64")}`;
                } else {
                    return mediaItem;
                }
            });

            return {
                ...review.toObject(),
                media: processedMedia,
                restaurantName: restaurantNames[review.restaurantId] || "Unknown Restaurant"
            };
        });

        res.render("customerProfile", { 
            customer,
            profilePicture,
            reviews: processedReviews,
            loggedUserEmail: req.session.email 
        });        

    } catch (error) {
        console.error("Error fetching customer profile:", error);
        res.status(500).json({ error: "Failed to load customer profile" });
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ error: "Logout failed" });
        }
        res.redirect("/loginPage");
    });
};
