const Customer = require("../model/customer"); // Ensure correct import
const Restaurant = require("../model/restaurant"); // Ensure correct import
const Review = require("../model/review"); // Ensure correct import
const Reply = require("../model/reply"); // Ensure correct import
const { v4: uuidv4 } = require("uuid"); 
const userInteractions = {};  // { "reviewId-userId": "like" or "dislike" }

exports.publicViewProfile = async (req, res) => {
    try {
        const { restoEmail } = req.params;
        console.log(`Fetching profile for: ${restoEmail}`);

        const restaurant = await Restaurant.findOne({ _id: restoEmail });
        if (!restaurant) {
            console.log("Restaurant not found!");
            return res.status(404).json({ error: "Restaurant not found" });
        }

        const tagsArray = restaurant.tags.split(",").map(tag => tag.trim());

        const restaurantReviews = await Review.find({ restaurantId: restoEmail });

        
        const processedReviews = restaurantReviews.map(review => {
            const processedMedia = review.media.map(mediaItem => {
                if (mediaItem.data) {
                    return `data:${mediaItem.contentType};base64,${mediaItem.data.toString("base64")}`;
                } else {
                    return mediaItem;
                }
            });

            return { ...review.toObject(), media: processedMedia };
        });
        
        const customerEmails = restaurantReviews.map(review => review.customerEmail);
        const customersData = await Customer.find(
            { email: { $in: customerEmails } }, 
            "email username pfp"
        );

        const customerPfps = {};
        const customerUsernames = {};

        customersData.forEach(customer => {
            customerPfps[customer.email] = customer.pfp && customer.pfp.data 
                ? `data:${customer.pfp.contentType};base64,${customer.pfp.data.toString("base64")}` 
                : "/images/default-user.png"; // Default profile picture

            customerUsernames[customer.email] = customer.username;
        });

        console.log("Customers fetched:", customersData.length);
        console.log("Customer usernames:", customerUsernames);
        console.log("Reviews fetched:", restaurantReviews.length);

        const repliesMap = {};
        for (const review of restaurantReviews) {
            const reviewReplies = await Reply.find({ reviewId: review._id });
            repliesMap[review._id] = reviewReplies; // Store replies in an object
        }

        console.log("Replies fetched:", Object.keys(repliesMap).length); 

        res.render("public_customerPOV_restoProfile", { 
            loggedUserEmail: null,
            restaurant,
            restaurantId:restaurant._id,
            tags: tagsArray,
            reviews: processedReviews,
            customerPfps,
            customerUsernames,
            repliesMap 
        });

    } catch (error) {
        console.error("Error fetching restaurant profile:", error);
        res.status(500).json({ error: "Failed to load restaurant profile" });
    }
};


exports.loggedViewProfile = async (req, res) => {
    try {
        const  {restaurantId}  = req.params;
        const email = req.session.user?.email;
        console.log(`Fetching profile for restaurant: ${restaurantId} (Viewed by: ${email})`);

        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) {
            console.log("Restaurant not found!");
            return res.status(404).json({ error: "Restaurant not found" });
        }

        const tagsArray = restaurant.tags.split(",").map(tag => tag.trim());

        const restaurantReviews = await Review.find({ restaurantId }); 

        let averageRating = 0;
        if (restaurantReviews.length > 0) {
            const totalRating = restaurantReviews.reduce((sum, review) => sum + review.rating, 0);
            averageRating = (totalRating / restaurantReviews.length).toFixed(2); // Round to 2 decimals
        }

        restaurant.rating = averageRating;
        restaurant.nReviews = restaurantReviews.length;
        await restaurant.save();

        const processedReviews = restaurantReviews.map(review => {
            const processedMedia = review.media.map(mediaItem => {
                if (mediaItem.data) {
                    return `data:${mediaItem.contentType};base64,${mediaItem.data.toString("base64")}`;
                } else {
                    return mediaItem;
                }
            });

            return { ...review.toObject(), media: processedMedia };
        });

        const customerEmails = restaurantReviews.map(review => review.customerEmail);
        const customersData = await Customer.find(
            { email: { $in: customerEmails } }, 
            "email username pfp"
        );

        const customerPfps = {};
        const customerUsernames = {};

        customersData.forEach(customer => {
            customerPfps[customer.email] = customer.pfp && customer.pfp.data 
                ? `data:${customer.pfp.contentType};base64,${customer.pfp.data.toString("base64")}` 
                : "/images/default-user.png"; // Default profile picture

            customerUsernames[customer.email] = customer.username;
        });

        console.log("Customers fetched:", customersData.length);
        console.log("Customer usernames:", customerUsernames);
        console.log("Reviews fetched:", restaurantReviews.length);

        const repliesMap = {};
        for (const review of restaurantReviews) {
            const reviewReplies = await Reply.find({ reviewId: review._id });
             repliesMap[review._id] = reviewReplies; // Store replies in an object
         }

        console.log("Replies fetched:", Object.keys(repliesMap).length); 

        res.render("customerPOV_restoProfile", { 
            loggedUserEmail: email, // Pass logged-in user email
            restaurant,
            restaurantId: restaurant._id,
            tags: tagsArray,
            reviews: processedReviews,  
             customerPfps,
             customerUsernames,
             repliesMap 
        });

    } catch (error) {
        console.error("Error fetching restaurant profile:", error);
        res.status(500).json({ error: "Failed to load restaurant profile" });
    }
};

exports.likeReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        const userId = req.session.user?._id;

        if (userInteractions[`${reviewId}-${userId}`] === "like") { //if reviewId then userId = like action
            return res.status(400).json({ error: "You already liked this review" });
        }

        if (userInteractions[`${reviewId}-${userId}`] === "dislike") {
            review.dislikes = Math.max(0, review.dislikes - 1);
        }

        review.like += 1;
        userInteractions[`${reviewId}-${userId}`] = "like"; 
        await review.save();
        res.json({ success: true, message: "Review liked!", like: review.like, dislikes: review.dislikes, userLiked: true, userDisliked: false });
    } catch (error) {
        console.error("Error liking review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.dislikeReview = async (req, res) => {
    try {
        const { reviewId } = req.params;


        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        const userId = req.session.user?._id;

        if (userInteractions[`${reviewId}-${userId}`] === "dislike") {
            return res.status(400).json({ error: "You already disliked this review" });
        }

        if (userInteractions[`${reviewId}-${userId}`] === "like") {
            review.like = Math.max(0, review.like - 1);
        }

        review.dislikes += 1;
        userInteractions[`${reviewId}-${userId}`] = "dislike"; // Store interacti
        await review.save();
        res.json({ success: true, message: "Review disliked!", like: review.like, dislikes: review.dislikes, userLiked: false, userDisliked: true });
    } catch (error) {
        console.error("Error disliking review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};