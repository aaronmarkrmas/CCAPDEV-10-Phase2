const Customer = require("../model/customer"); // Ensure correct import
const Restaurant = require("../model/restaurant"); // Ensure correct import
const Review = require("../model/review"); // Ensure correct import
const Reply = require("../model/reply"); // Ensure correct import
const { v4: uuidv4 } = require("uuid"); 

exports.viewProfile = async (req, res) => {
    try {
        const { email, restaurantId } = req.params;

        console.log(`Fetching profile for restaurant: ${restaurantId} (Viewed by: ${email})`);

        const restaurant = await Restaurant.findOne({ _id: restaurantId });
        if (!restaurant) {
            console.log("Restaurant not found!");
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Convert tags to an array
        const tagsArray = restaurant.tags.split(",").map(tag => tag.trim());

       
        // Render the restaurant profile with all necessary data
        res.render("write_review", { 
            loggedUserEmail: email, // Pass logged-in user email
            restaurant,
            restaurantId: restaurant._id,
            tags: tagsArray,
        
        });

    } catch (error) {
        console.error("Error fetching restaurant profile:", error);
        res.status(500).json({ error: "Failed to load restaurant profile" });
    }
};

exports.postReview = async (req, res) => { 
    try {
        const { title, review, rating} = req.body;
        const { email, restaurantId } = req.params; // Extract from URL parameters

        const formattedMedia = req.files.map(file => ({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer 
        }));

        console.log("Processed Media:", formattedMedia); // Debugging

        const customerEmail = req.user ? req.user.email : email || "Anonymous"; // Ensure correct email extraction
       

        if (!restaurantId || !title || !review || !rating) {
            return res.status(400).json({ error: "All fields are required" });
        }

        

        console.log(req.files)
        const newReview = new Review({
            _id: uuidv4(),
            restaurantId,
            customerEmail, // Updated field
            reviewTitle: title, // Rename to match schema
            rating: parseInt(rating),
            reviewText: review,
            media:formattedMedia
        }); 

        await newReview.save();
        console.log("Review posted successfully:", newReview);

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("Error posting review:", error);
        res.status(500).json({ error: "Failed to post review" });
    }
};