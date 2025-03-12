const Customer = require("../model/customer");
const DeactivatedAcc = require("../model/deactivatedAcc");

exports.getEditProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const customer = await Customer.findOne({ email });

        if (!customer) {
            console.log("Customer not found!"); 
            return res.status(404).json({ error: "Customer not found" });
        }

        console.log("Customer data fetched:", customer);
        res.render("editCustomerProfile", { customer });
    } catch (error) {
        console.error("Error loading customer profile:", error);
        res.status(500).json({ error: "Failed to load customer profile" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        if (req.file) {
            customer.pfp = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        customer.username = req.body.username || customer.username;
        customer.bio = req.body.bio || customer.bio;
        customer.email = req.body.email || customer.email;

        // Only update password if a new one is provided
        if (req.body.password) {
            customer.password = req.body.password;
        }

        await customer.save();

        res.render("editCustomerProfile", { customer });

    } catch (error) {
        console.error("Error updating customer profile:", error);
        res.status(500).json({ error: "An error occurred while updating the profile" });
    }
};

exports.deactivateAccount = async (req, res) => {
    console.log("Deactivate route hit with email:", req.params.email); // Debugging

    try {
        const email = req.params.email;

        if (!email) {
            console.log("No email provided"); // Debugging
            return res.status(400).json({ error: "Email is required" });
        }

        const customer = await Customer.findOne({ email });
        if (!customer) {
            console.log("Customer not found"); // Debugging
            return res.status(404).json({ error: "Customer not found" });
        }

        // Insert into deactivatedAcc collection
        const deactivatedEntry = { _id: customer._id, date: new Date() };
        await DeactivatedAcc.create(deactivatedEntry);
        console.log("Account successfully deactivated:", deactivatedEntry); // Debugging

        res.json({ message: "Account deactivated successfully" });
    } catch (error) {
        console.error("Error deactivating account:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
