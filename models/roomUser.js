const mongoose = require('mongoose');
const { mongoDB } = require('../mongoDB');

const roomUser = mongoose.Schema(
    {
      'roomName': {
        type: String,
      },
      'userName': {
        type: String,
      },
      'socketId': {
        type: String,
      },
    },
    {
      versionKey: false,
      collection: 'room_user',
    },
);

const roomUserSchema = mongoDB.model('roomUser', roomUser);

module.exports = roomUserSchema;
