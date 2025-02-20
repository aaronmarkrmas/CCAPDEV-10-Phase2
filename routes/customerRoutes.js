const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');
const multer = require('multer');
const path = require('path'); 

// multer storage
const storage = multer.memoryStorage(); // Store file as Buffer in memory
const upload = multer({ storage: storage });

// Render a customer page
router.get('/', (req, res) => {
    res.render('customer', { title: 'Customer Page' });
});

// Get all customers
router.get('/all', async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});

// Create a new customer 
router.post('/create', upload.single('pfp'), async (req, res) => {
    try {
        const { email, username, password, bio } = req.body;

        const newCustomer = new Customer({
            email,
            username,
            password,
            bio,
            pfp: {
                data: req.file.buffer, // Get the file data as Buffer
                contentType: req.file.mimetype // Get the file type 
            }
        });

        await newCustomer.save();
        res.status(201).json(newCustomer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

//get pfp, bio, and username
router.get('/profile/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const profileData = {
            username: customer.username,
            bio: customer.bio,
            profilePicUrl: `/customer/profile-pic/${customer._id}` // URL to fetch the profile picture
        };

        res.status(200).json(profileData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
/*
    HOW TO USE:
    <div class="profile-container">
        <img src="/customer/profile-pic/<%= customer._id %>" alt="Profile Picture" class="profile-pic">
        <h2><%= customer.username %></h2>
        <p><%= customer.bio %></p>
    </div>
*/


// Add a new review
router.post('/reviews/create', async (req, res) => {
    const { username, reviewText, rating, media } = req.body;

    try {
        const customer = await Customer.findOne({ username });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        const newReview = {
            username,
            reviewText,
            rating,
            media: media || [], // Optional media array
            datePosted: new Date(),
            isEdited: false,
            likes: 0,
            dislikes: 0
        };

        customer.reviews.push(newReview);
        await customer.save();

        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get reviews from a specific customer
router.get('/reviews/:username', async (req, res) => {
    try {
        const customer = await Customer.findOne({ username: req.params.username });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer.reviews); // Send back the reviews array
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//submit a report
router.post('/reports/submit', async (req, res) => {
    const { username, reviewId, reportText } = req.body;
    const customer = await Customer.findOne({ username });

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const review = customer.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.reports = review.reports || [];  
    review.reports.push({ reportText, dateReported: new Date() });
    await customer.save();

    res.status(201).json({ message: 'Report submitted successfully', customer });
});






module.exports = router;
