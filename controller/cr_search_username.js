const { customers } = require("../model/customer");

exports.getSearchUsernamePage = (req, res) => {
    res.render("search_username");
};

exports.getSearchUsernamePage = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await customers.find({}, "username pfp"); // Use "pfp" instead of "profile_pic"

        // Render the EJS page with users data
        res.render("search_username", { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};
