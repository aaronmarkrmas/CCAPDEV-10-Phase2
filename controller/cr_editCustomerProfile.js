const Customer = require("../model/customer");

exports.getEditProfile = async (req, res) => {
    try {
        const { email } = req.params;

        const customer = await Customer.findOne({ email: email }); 

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
        const email = req.params.email;
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

