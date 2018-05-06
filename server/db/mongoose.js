const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const localDb = 'mongodb://localhost:27017/dani';
const cloudDb = 'mongodb://bahtiyar_a:123456@ds014658.mlab.com:14658/dani';

mongoose.connect(localDb||cloudDb);

module.exports = {mongoose};