const express = require('express');
const router = express.Router();
const customerController = require('../controller/cr_customer_homeFeed');
const sidebar = require('../controller/cr_sideBar');


router.get('/:email/customer-home-feed', customerController.getCustomerHomeFeed);
router.get('/logout', sidebar.logout);
  
//http://localhost:3000/user2@example.com/customer-home-feed

module.exports = router;
