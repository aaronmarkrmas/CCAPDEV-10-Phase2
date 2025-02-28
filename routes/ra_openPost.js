const express = require('express');
const router = express.Router();
const openPostController = require('../controllers/ca_openPost');

router.get('/openPostID/:postId', openPostController.openPostById);

module.exports = router;
