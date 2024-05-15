const express = require("express");
const router = express.Router();
const Payment = require('../models/Payment');
const Menu = require('../models/Menu');

// Get data
router.get('/', async (req, res) => {
    try {
        const result = await Payment.aggregate([
            { $unwind: '$menuItems' },
            { $lookup: { from: 'menus', localField: 'menuItems', foreignField: '_id', as: 'menuItemDetails' } },
            { $unwind: '$menuItemDetails' },
            { $group: { _id: '$menuItemDetails._id', name: { $first: '$menuItemDetails.name' }, count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        console.log('Aggregation Result:', result); // Log the aggregation result

        // Extract menu items and their counts
        const menuItems = result.map(item => item.name);
        const counts = result.map(item => item.count);

        // Send the menu items and their counts as JSON response
        res.json({ menuItems, counts });
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
        res.status(500).send("Internal server error: " + error.message);
    }
});


module.exports = router;
