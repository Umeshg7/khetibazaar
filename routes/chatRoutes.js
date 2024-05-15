// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST route to post a new chat message
router.post('/', chatController.postMessage);

// GET route to retrieve all chat messages
router.get('/', chatController.getAllMessages);

router.get('/:sender', chatController.getMessagesBySender);

router.delete('/:id', chatController.deleteMessage)


module.exports = router;
