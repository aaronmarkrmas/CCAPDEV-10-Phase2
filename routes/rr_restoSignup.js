const express = require("express");
const router = express.Router();
const multer = require("multer");
const { handleSignup } = require("../controller/cr_restoSignup");
const Restaurant = require("../model/restaurant");
const Tag = require("../model/tag");  // ✅ Fixed import

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// **POST: Handle Restaurant Signup**
router.post('/', upload.single('pfp'), handleSignup);

// **GET: Fetch Tags & Render Signup Page**
router.get("/", async (req, res) => {
    try {
        const tagList = await Tag.find({});
        console.log("Fetched tags:", tagList);
        res.render("restoSignup", { errors: null, tags: tagList });
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.render("restoSignup", { errors: { message: "Failed to load tags." }, tags: [] });
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
