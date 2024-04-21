const express = require('express')
const Carts = require('../models/Carts');
const routes = express.Router();

const cartController = require('../controllers/cartControllers')

routes.get('/', cartController.getCartByEmail)
routes.post('/', cartController.addToCart);
routes.delete('/:id', cartController.deleteCart)
routes.put('/:id', cartController.updateCart)
routes.get('/:id', cartController.getSingleCart)

module.exports = routes;