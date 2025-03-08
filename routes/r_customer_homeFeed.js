const express = require('express');
const router = express.Router();
const customerController = require('../controller/cr_customer_homeFeed');

router.get('/:email/customer-home-feed', customerController.getCustomerHomeFeed);
//http://localhost:3000/user2@example.com/customer-home-feed

module.exports = router;
