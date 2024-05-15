const express = require("express");
const router = express.Router();
// import models
const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payment');
// middleware
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Get all orders, users, payments, menu items length
router.get('/', async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Payment.countDocuments();
    const ProductsItems = await Menu.countDocuments();
   
    const result = await Payment.aggregate([{
        $group: {
            _id: null,
            totalRevenue: { 
                $sum: '$price'
             }
        }
    }])

    const revenue = result.length > 0? result[0].totalRevenue : 0;
    res.status(200).json({
        users,
        ProductsItems,
        orders,
        revenue
    })

  } catch (error) {

    res.status(500).send("Internal server error:"+ error.message);
  }
});

module.exports = router;
