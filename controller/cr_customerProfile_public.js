const mongoose = require("mongoose");
const Customer = require("../model/customer");
const Review = require("../model/review");
const Restaurant = require("../model/restaurant");
const Report = require("../model/report");

exports.viewCustomerProfile = async (req, res) => {
    try {
        const { currentUserEmail, viewedUserEmail } = req.params;
        const decodedCurrentUserEmail = decodeURIComponent(currentUserEmail);
        const decodedViewedUserEmail = decodeURIComponent(viewedUserEmail);

        console.log(`Fetching profile for: ${decodedViewedUserEmail}`);

        // Fetch the viewed customer's profile details
        const customer = await Customer.findOne({ email: decodedViewedUserEmail }, "email username bio pfp");
        if (!customer) {
            console.log("Customer not found!");
            return res.status(404).json({ error: "Customer not found" });
        }

        const profilePicture = customer.pfp && customer.pfp.data
            ? `data:${customer.pfp.contentType};base64,${customer.pfp.data.toString("base64")}`
            : "/images/default-user.png";

        console.log(`Fetching reviews for customer: ${decodedViewedUserEmail}`);
        const customerReviews = await Review.find({ customerEmail: decodedViewedUserEmail }).sort({ datePosted: -1 });
        console.log(`Found ${customerReviews.length} reviews`);

        const restaurantIds = [...new Set(customerReviews.map(review => review.restaurantId))];
        console.log("Restaurant IDs from reviews:", restaurantIds);

        const restaurantsData = await Restaurant.find({ _id: { $in: restaurantIds } }, "_id restoName");
        console.log("Fetched restaurant data:", restaurantsData);

        const restaurantNames = {};
        restaurantsData.forEach(restaurant => {
            restaurantNames[restaurant._id] = restaurant.restoName;
        });

        const processedReviews = customerReviews.map(review => {
            console.log(`Processing review: ${review._id}, Restaurant ID: ${review.restaurantId}`);
            
            const processedMedia = review.media.map(mediaItem => {
                return mediaItem.data
                    ? `data:${mediaItem.contentType};base64,${mediaItem.data.toString("base64")}`
                    : mediaItem;
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
        console.log("Request body:", req.body);
        const { reviewId, reason, currentUserEmail } = req.body;

        if (!reviewId || !reason || !currentUserEmail) {
            console.log("Missing fields:", { reviewId, reason, currentUserEmail });
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const review = await Review.findById(reviewId);
        if (!review) {
            console.log("Review not found with ID:", reviewId);
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        // Generate a unique ID for the report
        const reportId = new mongoose.Types.ObjectId().toString();

        const newReport = new Report({
            _id: reportId, // Explicitly set the _id as required by your schema
            postId: reviewId,
            reporterEmail: currentUserEmail,
            reason: reason,
            dateReported: new Date(),
            isResolved: false,
        });

        console.log("About to save report:", newReport);
        await newReport.save();
        console.log("Report successfully submitted.");
        res.json({ success: true });
    } catch (error) {
        console.error("Error reporting the review:", error);
        res.status(500).json({ success: false, message: "Error reporting the review" });
    }
};