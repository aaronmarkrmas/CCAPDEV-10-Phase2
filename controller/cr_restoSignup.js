const bcrypt = require("bcrypt");
const Restaurant = require("../model/restaurant");

const handleSignup = async (req, res) => {
    const { email, contactNumber, restaurantName, password, location, description, tags } = req.body;

    if (!description) {
        console.error("Error: Description is missing in request.");
        return res.status(400).send("Description is required.");
    }

    // Convert tags array to a string (if tags exist)
    const tagsString = Array.isArray(tags) ? tags.join(', ') : tags;

    let profilePic = null;
    if (req.file) {
        profilePic = {
            data: req.file.buffer,  
            contentType: req.file.mimetype 
        };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        
        const newResto = new Restaurant({
            _id: email,
            restoName: restaurantName,
            password: hashedPassword,
            phone: contactNumber,
            location: location || "Br. Bloemen Hall",
            description,
            tags: tagsString,
            pfp: profilePic
        });

        await newResto.save();
        res.redirect('/login');
    } catch (error) {
        console.error("Error saving restaurant:", error);
        res.status(500).send("Error signing up.");
    }
};

module.exports = { handleSignup };
