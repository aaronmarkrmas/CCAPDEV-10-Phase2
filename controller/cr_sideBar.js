const Customer = require("../model/customer");
const Restaurant = require("../model/restaurant");
const Review = require("../model/review");
const Reply = require("../model/reply");

exports.viewProfile = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(`Fetching profile for: ${email}`);

        // Fetch restaurant by _id (which is email)
        const restaurant = await Restaurant.findOne({ _id: email });
        if (!restaurant) {
            console.log("Restaurant not found!");
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Fetch all reviews for the restaurant
        const restaurantReviews = await Review.find({ restaurantId: email });

        // Calculate average rating
        let averageRating = 0;
        if (restaurantReviews.length > 0) {
            const totalRating = restaurantReviews.reduce((sum, review) => sum + review.rating, 0);
            averageRating = (totalRating / restaurantReviews.length).toFixed(2); // Round to 2 decimals
        }

        // Update the restaurant rating in the database
        restaurant.rating = averageRating;
        restaurant.nReviews = restaurantReviews.length;
        await restaurant.save();

        // Fetch customer details for reviews in a single query
        const customerEmails = restaurantReviews.map(review => review.customerEmail);
        const customersData = await Customer.find(
            { email: { $in: customerEmails } },
            "email username pfp"
        );

        // Process customer profile pictures and usernames
        const customerPfps = {};
        const customerUsernames = {};
        customersData.forEach(customer => {
            customerPfps[customer.email] = customer.pfp?.data
                ? `data:${customer.pfp.contentType};base64,${customer.pfp.data.toString("base64")}`
                : "/images/default-user.png"; // Default profile picture

            customerUsernames[customer.email] = customer.username;
        });

        // Fetch all replies in one query instead of looping
        const reviewIds = restaurantReviews.map(review => review._id);
        const replies = await Reply.find({ reviewId: { $in: reviewIds } });

        // Organize replies by reviewId
        const repliesMap = {};
        if (replies && replies.length > 0) {
            replies.forEach(reply => {
                if (!repliesMap[reply.reviewId]) repliesMap[reply.reviewId] = [];
                repliesMap[reply.reviewId].push(reply);
            });
        }

        // Process media in reviews
        const processedReviews = restaurantReviews.map(review => ({
            ...review.toObject(),
            media: review.media.map(mediaItem =>
                mediaItem.data
                    ? `data:${mediaItem.contentType};base64,${mediaItem.data.toString("base64")}`
                    : mediaItem
            ),
        }));

        // Convert tags to a string
        const tagsString = restaurant.tags || "";

        // Convert profile picture (pfp) to base64 if available
        const restaurantPfp = restaurant.pfp?.data
            ? `data:${restaurant.pfp.contentType};base64,${restaurant.pfp.data.toString("base64")}`
            : "/images/default-user.png"; // Default profile picture

        // Render the profile page
        res.render("restoProfile", { 
            restaurant,
            tags: tagsString,
            restaurantPfp,
            reviews: processedReviews,
            customerPfps,
            customerUsernames,
            repliesMap: repliesMap || {},
            averageRating // Pass the calculated average rating
        });

    } catch (error) {
        console.error("Error fetching restaurant profile:", error);
        res.status(500).json({ error: "Failed to load restaurant profile" });
    }
};


// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Logout failed" });
      }

      res.redirect('/');
    });
    };
  
