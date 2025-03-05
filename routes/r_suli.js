const express = require('express');
const router = express.Router();
const homeController = require('../controller/cr_suli'); 

router.get('/suli', homeController.getSuLi); 

module.exports = router;
