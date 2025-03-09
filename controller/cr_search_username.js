const { customers } = require("../model/customer");

exports.getSearchUsernamePage = async (req, res) => {
    try {
        const users = await customers.find({}, "username email pfp");
        res.render("search_username", { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};
