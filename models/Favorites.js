const mongoose = require('mongoose');
const { Schema } = mongoose;

const favoriteSchema = new Schema({
    menuItemId: String,
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: String,
    image: String,
    email: {
        type: String,
        required: true,
    },
});

const Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;
