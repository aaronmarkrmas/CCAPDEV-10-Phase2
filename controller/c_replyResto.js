const Review = require("../model/review");
const Reply = require("../model/reply");
const Customer = require("../model/customer");
const Restaurant = require("../model/restaurant");
const { v4: uuidv4 } = require("uuid");

// Load reply page with review data
exports.getReplyPage = async (req, res) => {
    try {
        const { restaurantId, reviewId } = req.params;

        // Fetch restaurant details
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Fetch the review
        const review = await Review.findOne({ _id: reviewId });
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Fetch customer data for displaying profile pictures and usernames
        const customerData = await Customer.findOne({ email: review.customerEmail });
        const customerPfps = {};
        const customerUsernames = {};
        if (customerData) {
            customerPfps[review.customerEmail] = customerData.pfp ? 
                `data:${customerData.pfp.contentType};base64,${customerData.pfp.data.toString("base64")}` :
                "/images/default-user.png";
            customerUsernames[review.customerEmail] = customerData.username;
        }

        // Fetch review media
        const reviewMedia = review.media ? review.media.map(media => ({
            url: `data:${media.contentType};base64,${media.data.toString("base64")}`,
            type: media.contentType.startsWith("image") ? "image" : "video"
        })) : [];

        res.render("restoReply", { restaurant, review, customerPfps, customerUsernames, reviewMedia });
    } catch (error) {
        console.error("Error loading reply page:", error);
        res.status(500).json({ error: "Failed to load reply page" });
    }
};


// Handle reply submission
exports.submitReply = async (req, res) => {
    try {
        const { restaurantId, reviewId } = req.params;
        const { replyText } = req.body;

        if (!replyText.trim()) {
            return res.status(400).json({ error: "Reply text cannot be empty." });
        }

        // Fetch restaurant name
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Create and save the reply
        const newReply = Reply({
            _id: uuidv4(),
            reviewId,
            restoName: restaurant.restoName,
            replyText,
            datePosted: new Date(),
            isEdited: false
        });

        await newReply.save();
        console.log("Reply saved successfully:", newReply);

        // Redirect back to restaurant profile with confirmation
        res.redirect(`/restaurant/${restaurantId}/profile`);
    } catch (error) {
        console.error("Error submitting reply:", error);
        res.status(500).json({ error: "Failed to submit reply." });
    }
};
