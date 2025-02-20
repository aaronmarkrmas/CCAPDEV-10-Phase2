const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');

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
router.post('/create', async (req, res) => {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
});

// Add a new review
router.post('/reviews/create', async (req, res) => {
    const { username, reviewText, rating } = req.body;
    const customer = await Customer.findOne({ username });

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    customer.reviews.push({ reviewText, rating });
    await customer.save();

    res.status(201).json(customer);
});

//submit a report
router.post('/reports/submit', async (req, res) => {
    const { username, reviewId, reportText } = req.body;
    const customer = await Customer.findOne({ username });

    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const review = customer.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.reports = review.reports || [];  // Ensure reports array exists
    review.reports.push({ reportText, dateReported: new Date() });
    await customer.save();

    res.status(201).json({ message: 'Report submitted successfully', customer });
});






module.exports = router;
