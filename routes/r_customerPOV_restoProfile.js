const express = require("express");
const router = express.Router();
const sidebarController = require("../controller/c_customerPOV_restoProfile");
const sideBar = require("../controller/cr_sideBar");

router.get("/:restoEmail/profile", sidebarController.publicViewProfile);

router.get("/:email/profile/:restaurantId", sidebarController.loggedViewProfile);

router.post("/review/like/:reviewId", sidebarController.likeReview);

router.post("/review/dislike/:reviewId", sidebarController.dislikeReview);

router.post("/logout", sideBar.logout);



module.exports = router;