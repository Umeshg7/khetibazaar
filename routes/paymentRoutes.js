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

//get all payment by admin
routes.get('/all', async(req, res) => {
    try {
        const payments = await Payment.find({}).sort({createdAt:-1}).exec();
        res.status(200).json(payments)
    } catch{
        res.status(404).json({message: error.message});
    }
})

// condirming the payment 
routes.patch('/:id', async(req, res) =>{
    const payId = req.params.id;
    const{status} = req.body;
    try {
        const updateStatus = await Payment.findByIdAndUpdate(payId, {status: "confirmed"},
            {new: true, runValidators: true}
        );
        if(!updateStatus){
            return res.status(404).json({message: "Payment not found"});
        }
    } catch{
        res.status(404).json({message: error.message});
    }
})


module.exports = routes;