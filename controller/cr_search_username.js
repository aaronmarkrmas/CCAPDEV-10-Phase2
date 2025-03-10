const customers = require("../model/customer");

exports.getSearchUsernamePage = async (req, res) => {
    try {
        const searchQuery = req.query.query ? req.query.query.trim() : "";
        let users = [];

        if (searchQuery) {
            users = await customers.find(
                { username: { $regex: searchQuery, $options: "i" } },
                "username email pfp"
            );
        } else {
            users = await customers.find({}, "username email pfp");
        }

        // Convert profile pictures to Base64 format for rendering
        users = users.map(user => ({
            username: user.username,
            email: user.email,
            pfp: user.pfp?.data
                ? `data:${user.pfp.contentType};base64,${user.pfp.data.toString("base64")}`
                : "/images/default_pfp.png" // Default image if no profile picture
        }));

        res.render("search_username", { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};
