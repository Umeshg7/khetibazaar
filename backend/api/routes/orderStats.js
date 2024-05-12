const express = require("express");
const router = express.Router();

const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payment');
// middleware
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Get data
router.get('/', async (req, res) => {
    try {
        const result = await Payment.aggregate([
            {
                $unwind: '$menuItems'
            },
            {
                $lookup: {
                    from: 'menus',
                    localField: 'menuItems',
                    foreignField: '_id',
                    as: 'menuItemDetails',
                }
            },
            {
                $unwind: '$menuItemDetails'
            },
            {
                $group: {
                    _id: '$menuItemDetails.category',
                    quantity: {$sum: '$quantity'},
                    revenue: {$sum: '$price'},
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    quantity: '$quantity',
                    revenue: '$revenue'
                }
            }
        ]);

        res.json(result);

    } catch (error) { // Define error variable
        res.status(500).send("Internal server error: " + error.message); // Access error.message
    }
});

module.exports = router;
