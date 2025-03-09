const Reply = require("../model/reply");
const Review = require("../model/review");
const Restaurant = require("../model/restaurant");
const Customer = require("../model/customer");

exports.getEditReplyPage = async (req, res) => {
    try {
        const { restaurantId, reviewId, replyId } = req.params;

        //  restaurant details
        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

        //  review details
        const review = await Review.findOne({ _id: reviewId });
        if (!review) return res.status(404).json({ error: "Review not found" });

        //  the existing reply
        const reply = await Reply.findOne({ _id: replyId, reviewId });
        if (!reply) return res.status(404).json({ error: "Reply not found" });

        //  customer data 
        const customer = await Customer.findOne({ email: review.customerEmail }, "username pfp");

        const customerPfps = {};
        const customerUsernames = {};
        customerPfps[review.customerEmail] = customer?.pfp || "/images/default-user.png";
        customerUsernames[review.customerEmail] = customer?.username || "Unknown User";

        res.render("editReply", { restaurant, review, reply, customerPfps, customerUsernames });

    } catch (error) {
        console.error("Error fetching edit reply page:", error);
        res.status(500).json({ error: "Failed to load edit reply page" });
    }
};

exports.updateReply = async (req, res) => {
    try {
        const { restaurantId, reviewId, replyId } = req.params;
        const { replyText } = req.body;

        if (!replyText.trim()) {
            return res.status(400).json({ error: "Reply text cannot be empty" });
        }

        const updatedReply = await Reply.findOneAndUpdate(
            { _id: replyId, reviewId },
            { 
                replyText,
                isEdited: true,
                dateEdited: new Date()
            },
            { new: true }
        );

        if (!updatedReply) {
            return res.status(404).json({ error: "Reply not found" });
        }

        console.log("Reply updated:", updatedReply);

        res.redirect(`/restaurant/${restaurantId}/profile`);

    } catch (error) {
        console.error("Error updating reply:", error);
        res.status(500).json({ error: "Failed to update reply" });
    }
};
