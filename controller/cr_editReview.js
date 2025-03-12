const Customer = require("../model/customer");
const Restaurant = require("../model/restaurant");
const Review = require("../model/review");
const { v4: uuidv4 } = require("uuid");

exports.viewReviewForEdit = async (req, res) => {
    try {
        const { email, reviewId } = req.params;

        console.log(`Fetching review: ${reviewId} by user: ${email}`);

        // Fetch review by ID
        const review = await Review.findOne({ _id: reviewId, customerEmail: email });
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Fetch restaurant based on review.restaurantId
        const restaurant = await Restaurant.findOne({ _id: review.restaurantId });
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        console.log("Passing loggedUserEmail:", email);

        // Pass the logged user email, review, and rating
        res.render("editReview", { 
            loggedUserEmail: email,
            restaurant,  
            review,
            rating: review.rating // Pass rating explicitly
        });

    } catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ error: "Failed to load review" });
    }
};


exports.updateReview = async (req, res) => {
    try {
        const { title, review, rating } = req.body;
        const { email, reviewId } = req.params;

        console.log("Updating review...");
        console.log("Review ID:", reviewId);
        console.log("Customer Email:", email);

        // Ensure rating is within allowed range
        const parsedRating = parseInt(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            return res.status(400).json({ error: "Invalid rating. Must be between 1 and 5." });
        }

        // Process uploaded media
        const formattedMedia = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }));

        console.log("Updated Media:", formattedMedia);

        // Prepare update data
        const updateData = {
            reviewTitle: title,
            reviewText: review,
            rating: parsedRating,
            edited: true,
            datePosted: Date.now() // Update timestamp when edited
        };

        if (formattedMedia.length > 0) {
            updateData.media = formattedMedia; // Only update media if new files exist
        }

        // Update review based on `_id` and `customerEmail`
        const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewId, customerEmail: email },
            { $set: updateData },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        console.log("Review updated successfully:", updatedReview);
        res.json(updatedReview);  // Respond with the updated review in JSON format

    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: error.message || "Failed to update review" });
    }
};


