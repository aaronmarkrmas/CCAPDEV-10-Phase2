const express = require('express');
const router = express.Router();
const replyController = require('../controllers/cr_editReply'); 

// edit a reply
router.put('/editReply/:replyId', replyController.editReply);

module.exports = router;
