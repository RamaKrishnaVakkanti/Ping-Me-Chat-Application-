const mongoose = require('mongoose');
const { mongoDB } = require('../mongoDB');

const roomChat = mongoose.Schema(
    {
      'roomName': {
        type: String,
      },
      'userName': {
        type: String,
      },
      'message': {
        type: String,
      },
      'time': {
        type: String,
      },
    },
    {
      versionKey: false,
      collection: 'room_chat',
    },
);

const roomChatSchema = mongoDB.model('roomChat', roomChat);

module.exports = roomChatSchema;
