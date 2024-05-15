// controllers/chatController.js
const ChatMessage = require('../models/ChatMessage');
exports.postMessage = async (req, res) => {
  const { sender, message } = req.body;
  try {
    const newChatMessage = await ChatMessage.create({ sender, message });
    res.status(201).json(newChatMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params.id;
  try {
    const deletedMessage = await ChatMessage.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully", deletedMessage });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMessagesBySender = async (req, res) => {
  const sender = req.params.sender;
  try {
    const messages = await ChatMessage.find({ sender }).select('message');
    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this sender' });
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
