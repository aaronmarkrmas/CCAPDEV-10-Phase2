const express = require('express');
const router = express.Router();
const { Restaurant } = require('../model/restaurant');
const restaurantController = require('../controller/cr_editRestoProfile');


// GET route to display the edit form
router.get("/restaurant/:email/updateProfile", async (req, res) => {
    try {
        const { email } = req.params;
        const restaurant = await Restaurant.findOne({ email });
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.render("editRestoProfile", { restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load restaurant profile" });
    }
});

// edit restaurant profile
router.post("/restaurant/:email/updateProfile", restaurantController.updateProfile);



module.exports = router;
