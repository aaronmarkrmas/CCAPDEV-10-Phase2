const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleSignup } = require("../controller/cr_restoSignup");
const Restaurant = require("../model/restaurant");  // ✅ Fix import (remove `{ Restaurant }`)
const { tags } = require("../model/tag");  

const storage = multer.memoryStorage(); // Stores file in memory
const upload = multer({ storage: storage });

router.post('/', upload.single('pfp'), async (req, res) => {
    console.log("Uploaded file:", req.file);
    
    try {
        const newRestaurant = new Restaurant({
            _id: req.body.email,
            restoName: req.body.restaurantName,
            password: req.body.password,
            phone: req.body.contactNumber,
            description: req.body.description,
            tags: req.body.tags ? req.body.tags.join(", ") : "",
            location: req.body.location || "Br. Bloemen Hall",
            pfp: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null
        });

        await newRestaurant.save();
        res.redirect('/login');
    } catch (error) {
        console.error("Error saving restaurant:", error);
        res.status(500).send("Error signing up.");
    }
});

router.get("/", async (req, res) => {
    try {
        const tagList = await tags.find({});
        console.log("Fetched tags:", tagList);
        res.render("restoSignup", { errors: null, tags: tagList });
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.render("restoSignup", { errors: { message: "Failed to load tags." }, tags: [] });
    }
});

module.exports = router;
