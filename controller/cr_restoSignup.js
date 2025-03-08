const Restaurant = require("../model/restaurant");

const handleSignup = async (req, res) => {
    const { email, contactNumber, restaurantName, password, location, description, tags } = req.body;

    // Ensure description is provided
    if (!description) {
        console.error("Error: Description is missing in request.");
        return res.status(400).send("Description is required.");
    }

    // Convert tags array to a string
    const tagsString = Array.isArray(tags) ? tags.join(', ') : tags;

    // Store image as binary
    let profilePic = null;
    if (req.file) {
        profilePic = {
            data: req.file.buffer,  
            contentType: req.file.mimetype 
        };
    }

    try {
        const newResto = new Restaurant({
            _id: email,  
            restoName: restaurantName,
            password,
            phone: contactNumber,
            location,
            description,
            tags: tagsString,  // Convert array to string
            pfp: profilePic
        });

        await newResto.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error signing up.");
    }
};

module.exports = { handleSignup };
