// api/controllers/searchController.js

const Menu = require("../models/Menu"); // Import the model to search

// Controller function to search menu items
const searchMenu = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Case-insensitive regex to search by name or description
    const regex = new RegExp(query, 'i');
    const results = await Menu.find({
      $or: [{ name: regex }, { description: regex }], // Adjust this based on what you want to search
    });

    res.status(200).json(results); // Return the search results as JSON
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  searchMenu,
};
