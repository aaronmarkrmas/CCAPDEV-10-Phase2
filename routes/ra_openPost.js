const express = require('express');
const router = express.Router();
const { Review } = require('../CCAPDEV-10-Phase2/model/customer'); 
const { Reply } = require('../CCAPDEV-10-Phase2/model/restaurant'); 

// open post using postID (reviewId or replyId)
router.get('/openPostID/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        
        let post = await Review.findOne({ _id: postId });
        
        if (!post) {
            post = await Reply.findOne({ replyId: postId });
        }
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving post details' });
    }
});

module.exports = router;
