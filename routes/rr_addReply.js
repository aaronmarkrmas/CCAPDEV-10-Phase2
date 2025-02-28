const express = require('express');
const { v4: uuidv4 } = require('uuid'); // id generator
const { Restaurant, Reply } = require('../CCAPDEV-10-Phase2/model/restaurant');

const router = express.Router();

// add a reply to a review
router.post('/addReply', async (req, res) => {
    try {
        const { reviewId, restoName, replyText } = req.body;

        // check if the review exists
        const reviewExists = await Reply.findOne({ reviewId });
        if (!reviewExists) {
            return res.status(404).json({ error: 'Review not found' });
        }

        const newReply = new Reply({
            replyId: uuidv4(), 
            reviewId,
            restoName,
            datePosted: new Date(),
            isEdited: false,
            dateEdited: null
        });

        await newReply.save();
        res.status(201).json({ message: 'Reply added successfully', reply: newReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add reply' });
    }
});

module.exports = router;
