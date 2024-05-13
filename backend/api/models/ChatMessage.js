// models/ChatMessage.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatMessageSchema = new Schema({
  sender: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
