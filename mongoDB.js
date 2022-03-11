require('dotenv').config();
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 60000,
//   keepAlive: 12000,
  retryWrites: false,
  useUnifiedTopology: true,
};

const mongoDB = mongoose.createConnection(process.env.MONGO_STRING, options);

mongoDB.on('connected', function() {
  console.log('info', `Connected to mongoDB successfully`);
});

mongoDB.on('error', function(err) {
  console.log('error', `Connection error ocurred ${err}`);
});


module.exports = {mongoDB};
