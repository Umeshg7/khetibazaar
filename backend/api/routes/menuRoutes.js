const express = require("express");
const Menu = require("../models/Menu");
const routes = express.Router();

const menuController = require('../controllers/menuControllers')

// get all menu items 

routes.get('/', menuController.getAllMenuItems )

// post a menu item
routes.post('/', menuController.postMenuItem);

// delete a menu item
routes.delete('/:id', menuController.deleteMenuItem);

// get single menu item
routes.get('/:id', menuController.singleMenuItem);

// update single menu item
routes.patch('/:id', menuController.updateMenuItem)

module.exports= routes;