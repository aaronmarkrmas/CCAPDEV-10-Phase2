const customers = require("../model/customer");
const DeactivatedAccount = require("../model/deactivatedAcc");

exports.getSearchUsernamePage = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const searchQuery = req.query.query ? req.query.query.trim() : "";

        const deactivatedAccounts = await DeactivatedAccount.find({}, "_id");
        const deactivatedIds = deactivatedAccounts.map(acc => acc._id);

        let users = [];

        const query = { 
            email: { $ne: userEmail }, 
            _id: { $nin: deactivatedIds } 
        };

        if (searchQuery) {
            query.username = { $regex: searchQuery, $options: "i" };
        }

        users = await customers.find(query, "username email pfp");

        users = users.map(user => ({
            username: user.username,
            email: user.email,
            pfp: user.pfp?.data
                ? `data:${user.pfp.contentType};base64,${user.pfp.data.toString("base64")}`
                : "/images/default_pfp.png"
        }));

        res.render("search_username", { users, currentUserEmail: userEmail, searchQuery });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.viewPublicProfile = async (req, res) => {
    try {
        const viewerEmail = req.params.viewerEmail;
        const vieweeEmail = req.params.vieweeEmail;
        
        const viewer = await customers.findOne({ email: viewerEmail });
        const viewee = await customers.findOne({ email: vieweeEmail });

        if (!viewee) {
            return res.status(404).send("User not found");
        }

        // Render the public profile page with details of both the viewer and viewee
        res.render("customerProfilePublic", { viewer, viewee });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send("Internal Server Error");
    }
};
