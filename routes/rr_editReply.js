const express = require('express');
const router = express.Router();
const { Reply } = require('../CCAPDEV-10-Phase2/model/restaurant');

// edit a reply
router.put('/editReply/:replyId', async (req, res) => {
    try {
        const { replyId } = req.params;
        const { newReplyText } = req.body;

        // find reply by ID
        const reply = await Reply.findOne({ replyId });
        if (!reply) {
            return res.status(404).json({ error: 'Reply not found' });
        }

        if (newReplyText !== undefined && newReplyText !== '') {
            reply.replyText = newReplyText;
            reply.isEdited = true;
            reply.dateEdited = new Date();
        } else {
            return res.status(400).json({ error: 'Reply text cannot be empty' });
        }

        await reply.save();
        res.status(200).json({ message: 'Reply updated successfully', reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update reply' });
    }
});

module.exports = router;
