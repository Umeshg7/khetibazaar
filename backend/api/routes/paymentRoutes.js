const express = require('express')
const mongoose = require('mongoose');
const routes = express.Router();
const Payment = require('../models/Payment')
const Cart = require('../models/Carts')
const ObjectId = mongoose.Types.ObjectId;



const verifyToken = require('../middleware/verifyToken');
//METHODS

//post payment to db
routes.post('/',verifyToken, async (req, res) =>{
    const payment = req.body;
    try{
        const paymentRequest = await Payment.create(payment);

        //delete cart after payment
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({_id: {$in: cartIds}})

        res.status(200).json({paymentRequest, deleteCartRequest})

    } catch (error){
        res.status(404).json({message:error.message});
    }
})

routes.get('/', verifyToken, async (req, res) =>{
    const email = req.query.email;
    const query = {email: email}
    try {
        const decodedEmail = req.decoded.email;
        if(email !== decodedEmail){
            res.status(403).json({message: "Forbiden Access"})

        }
        const result = await Payment.find(query).sort({createdAt: -1}).exec();
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})


module.exports = routes;