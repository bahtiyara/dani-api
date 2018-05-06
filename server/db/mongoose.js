const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const localDb = 'mongodb://127.0.0.1:27017/dani';  // local database
const cloudDb = 'mongodb://bahtiyar_a:123456@ds014658.mlab.com:14658/dani';  //MongoLab cloud-hosted database

mongoose.connect(localDb||cloudDb);

module.exports = {mongoose};