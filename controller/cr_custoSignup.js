const Customer = require("../model/customer");

const handleCustomerSignup = async (req, res) => {
    const { email, username, password, bio } = req.body;

    if (!bio) {
        console.error("Error: Bio is missing in request.");
        return res.status(400).send("Bio is required.");
    }

    let profilePic = null;
    if (req.file) {
        profilePic = {
            data: req.file.buffer,  
            contentType: req.file.mimetype 
        };
    }

    try {
        const newCustomer = new Customer({
            email,
            username,
            password,
            bio,
            pfp: profilePic
        });

        await newCustomer.save();
        res.redirect('/login');  
    } catch (error) {
        console.error("Error saving customer:", error);
        res.status(500).send("Error signing up.");
    }
};

module.exports = { handleCustomerSignup };
