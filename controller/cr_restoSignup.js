// cr_restoSignup.js (Controller File)
const mongoose = require("mongoose");
const { tags } = require("../model/tag");
const Restaurant = require("../model/restaurant");

exports.getSignupPage = async (req, res) => {
    try {
        const allTags = await tags.find();
        res.render("restoSignup", { tags: allTags, errors: {} });
    } catch (error) {
        res.status(500).send("Error loading signup page.");
    }
};

exports.handleSignup = async (req, res) => {
    const { email, contactNumber, restaurantName, password, location, description, tags } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    let errors = {};
    if (!email) errors.email = "Email is required.";
    if (!contactNumber) errors.contactNumber = "Contact number is required.";
    if (!restaurantName) errors.restaurantName = "Restaurant name is required.";
    if (!password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
        const allTags = await tags.find();
        return res.render("restoSignup", { tags: allTags, errors });
    }

    try {
        const newResto = new Restaurant({
            email, contactNumber, restaurantName, password, location, description, tags, profilePic
        });
        await newResto.save();
        res.redirect(`/${email}/profile`);
    } catch (error) {
        res.status(500).send("Error signing up.");
    }
};