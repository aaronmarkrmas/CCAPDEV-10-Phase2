const express = require('express');
const router = express.Router();
const replyController = require('../controllers/cr_deleteReply'); 

// delete reply
router.delete('/deleteReply/:replyId', replyController.deleteReply);

module.exports = router;
