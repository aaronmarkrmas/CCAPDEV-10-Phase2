const Customer = require("../model/customer"); 
const Review = require("../model/review"); 
const Restaurant = require("../model/restaurant"); 

// View Customer Profile
exports.viewCustomerProfile = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(`Fetching customer profile for: ${email}`);

        // Fetch customer data
        const customer = await Customer.findOne({ email });
        if (!customer) {
            console.log("Customer not found!");
            return res.status(404).json({ error: "Customer not found" });
        }

        // Process profile picture
        const profilePicture = customer.pfp?.data
            ? `data:${customer.pfp.contentType};base64,${customer.pfp.data.toString("base64")}`
            : "/images/default-user.png"; // Default profile picture

        // Fetch all reviews by this customer
        console.log(`Fetching reviews for customer: ${email}`);
        const customerReviews = await Review.find({ customerEmail: email }).sort({ datePosted: -1 });
        console.log(`Found ${customerReviews.length} reviews`);

        // Get restaurant names in a single query
        const restaurantIds = [...new Set(customerReviews.map(review => review.restaurantId))];
        const restaurantsData = await Restaurant.find(
            { _id: { $in: restaurantIds } }, 
            "_id name"
        );
        
        // Map restaurant IDs to names
        const restaurantNames = {};
        restaurantsData.forEach(restaurant => {
            restaurantNames[restaurant._id] = restaurant.name;
        });

        // Process reviews and media
        const processedReviews = customerReviews.map(review => ({
            ...review.toObject(),
            media: review.media.map(mediaItem => 
                mediaItem.data
                    ? `data:${mediaItem.contentType};base64,${mediaItem.data.toString("base64")}`
                    : mediaItem
            ),
            restaurantName: restaurantNames[review.restaurantId] || "Unknown Restaurant"
        }));

        // Render the profile page
        res.render("customerProfile", { 
            customer,
            profilePicture,
            reviews: processedReviews,
            loggedUserEmail: req.session?.email || email
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

// Delete Review
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { email } = req.params;
        
        // Verify the customer owns this review
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        
        if (review.customerEmail !== email) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }
        
        // Delete the review
        await Review.findByIdAndDelete(reviewId);
        
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({ success: false, message: "Failed to delete review" });
    }
};