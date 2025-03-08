const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Restaurant, Reply } = require('../CCAPDEV-10-Phase2/model/restaurant');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new restaurant
router.post('/create', upload.single('profilePhoto'), async (req, res) => {
    try {
        const { email, restoName, password, phone, description, tags } = req.body;

        const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

        const newRestaurant = new Restaurant({
            email,
            restoName,
            password,
            phone,
            description,
            tags: tagsArray,
            pfp: {
                data: req.file.buffer, 
                contentType: req.file.mimetype 
            }
        });

        await newRestaurant.save();
        res.status(201).json({ message: 'Restaurant created successfully', restaurant: newRestaurant });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});

/*
// Get restaurant profile (excluding password)
router.get('/profile/:restoName', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ restoName: req.params.restoName }, '-password');
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const profileData = {
            email: restaurant.email,
            restoName: restaurant.restoName,
            phone: restaurant.phone,
            description: restaurant.description,
            tags: restaurant.tags,
            location: restaurant.location,
            nReviews: restaurant.nReviews,
            rating: restaurant.rating,
            profilePhotoUrl: `/restaurant/profile-pic/${restaurant.restoName}` 
        };

        res.status(200).json(profileData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/profile/:restoName', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ restoName: req.params.restoName });
        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        res.render('restaurant_profile', { restaurant });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// Get all restaurants (only necessary fields)
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}, 'restoName description tags location nReviews rating');
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
});

// Add a reply to a review
router.post('/replies/create', async (req, res) => {
    try {
        const { replyId, reviewId, restoName, replyText } = req.body;

        const restaurant = await Restaurant.findOne({ restoName });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const newReply = new Reply({
            replyId,
            reviewId,
            restoName,
            replyText
        });

        await newReply.save();

        res.status(201).json({ message: 'Reply added successfully', reply: newReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add reply' });
    }
});

// Get replies for a specific review
router.get('/replies/:reviewId', async (req, res) => {
    try {
        const replies = await Reply.find({ reviewId });

        if (!replies.length) {
            return res.status(404).json({ message: 'No replies found for this review' });
        }

        res.status(200).json(replies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch replies' });
    }
});

app.get("/restaurant/edit-profile", (req, res) => {
    res.render("resto_edit_profile", { restaurant: req.session.restaurant });
});
*/

module.exports = router;
