const express = require('express');
const Favorites = require('../models/Favorites');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Get favorites by email
router.get('/', verifyToken, async (req, res) => {
    const { email } = req.query;
    try {
        const favorites = await Favorites.find({ email });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new favorite
router.post('/', verifyToken, async (req, res) => {
    const { menuItemId, name, description, image, email } = req.body;
    try {
        const existingFavorite = await Favorites.findOne({ email, menuItemId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Item already favorited!' });
        }
        
        const newFavorite = await Favorites.create({
            menuItemId,
            name,
            description,
            image,
            email,
        });
        
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a favorite by ID
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFavorite = await Favorites.findByIdAndDelete(id);
        if (!deletedFavorite) {
            return res.status(404).json({ message: 'Favorite item not found!' });
        }
        res.status(200).json({ message: 'Favorite item removed!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
