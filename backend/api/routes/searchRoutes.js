// api/routes/searchRoutes.js

const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController"); // Import your controller

router.get('/', searchController.searchMenu); // Search route for menu items

module.exports = router;
