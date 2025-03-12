const Customer = require("../model/customer");
const Review = require("../model/review");
const Restaurant = require("../model/restaurant");
const Report = require("../model/report");

exports.viewCustomerProfile = async (req, res) => {
    try {
        const { currentUserEmail, viewedUserEmail } = req.params;
        const decodedCurrentUserEmail = decodeURIComponent(currentUserEmail);
        const decodedViewedUserEmail = decodeURIComponent(viewedUserEmail);

        // Fetch the viewed customer's profile details
        const customer = await Customer.findOne({ email: decodedViewedUserEmail }, "email username bio pfp");
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        const profilePicture = customer.pfp && customer.pfp.data
            ? `data:${customer.pfp.contentType};base64,${customer.pfp.data.toString("base64")}`
            : "/images/default-user.png";

        const customerReviews = await Review.find({ customerEmail: decodedViewedUserEmail }).sort({ datePosted: -1 });

        const restaurantIds = [...new Set(customerReviews.map(review => review.restaurantId))];
        const restaurantsData = await Restaurant.find({ _id: { $in: restaurantIds } }, "_id name");

        const restaurantNames = {};
        restaurantsData.forEach(restaurant => {
            restaurantNames[restaurant._id] = restaurant.name;
        });

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
                restaurantName: restaurantNames[review.restaurantId] || "Unknown Restaurant",
                starRating: Array.from({ length: 5 }, (_, i) => i < review.rating)
            };
        });

        res.render("customerProfile_public", {
            currentUserEmail: decodedCurrentUserEmail,
            customer,
            profilePicture,
            reviews: processedReviews
        });

    } catch (error) {
        console.error("Error fetching customer public profile:", error);
        res.status(500).json({ error: "Failed to load public profile" });
    }
};

// Function to handle the report of a review
exports.reportReview = async (req, res) => {
    try {
        const { reviewId, reason, currentUserEmail } = req.body;

        if (!reviewId || !reason || !currentUserEmail) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Find the review being reported
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        // Create the report using the review's _id as the report _id
        const newReport = new Report({
            _id: reviewId,  // Use the review's _id as the report _id
            reporterUsername: currentUserEmail,
            reason: reason,
            isResolved: false,
        });

        await newReport.save();
        console.log("Report successfully submitted.");
        res.json({ success: true });
    } catch (error) {
        console.error("Error reporting the review:", error);
        res.status(500).json({ success: false, message: "Error reporting the review" });
    }
};

