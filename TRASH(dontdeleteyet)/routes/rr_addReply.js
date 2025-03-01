const express = require('express');
const router = express.Router();
const replyController = require('../controllers/cr_addReply'); 

// add a reply to a review
router.post('/addReply', replyController.addReply);

module.exports = router;
