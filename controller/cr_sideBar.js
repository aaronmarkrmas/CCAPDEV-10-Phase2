const { restaurants } = require("../model/restaurant");
const { reviews } = require("../model/review");
const { customers } = require("../model/customer");

exports.viewProfile = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(`Fetching profile for: ${email}`);

        // Fetch restaurant details
        const restaurant = await restaurants.findOne({ _id: email });
        if (!restaurant) {
            console.log("Restaurant not found!");
            return res.status(404).json({ error: "Restaurant not found" });
        }

        // Convert tags string to array
        const tagsArray = restaurant.tags.split(",").map(tag => tag.trim());

        // Fetch reviews associated with the restaurant
        const restaurantReviews = await reviews.find({ restaurantId: email });

        const customerEmails = restaurantReviews.map(review => review.customerEmail);
        const customersData = await customers.find({ email: { $in: customerEmails } }, "email username pfp");

        // Convert customer pfp & username into lookup dictionaries
        const customerPfps = {};
        const customerUsernames = {};  // ✅ NEW: Store usernames

        customersData.forEach(customer => {
            if (customer.pfp && customer.pfp.data) {
                customerPfps[customer.email] = `data:${customer.pfp.contentType};base64,${customer.pfp.data.toString("base64")}`;
            } else {
                customerPfps[customer.email] = "/images/default-user.png"; // Default pfp
            }

            customerUsernames[customer.email] = customer.username;  // ✅ Store username
        });

        console.log("Customers fetched:", customersData.length);  // ✅ Debugging
        console.log("Customer usernames:", customerUsernames);
        console.log("Reviews fetched:", restaurantReviews.length);

        // Send all data to frontend
        res.render("restoProfile", { 
            restaurant,
            tags: tagsArray,
            reviews: restaurantReviews,
            customerPfps,
            customerUsernames // ✅ NEW: Pass usernames to EJS
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
        res.redirect("/loginPage");
    });
};
