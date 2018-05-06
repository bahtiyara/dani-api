const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://bahtiyar_a:123456@ds014658.mlab.com:14658/dani' || 'mongodb://localhost:27017/dani');

module.exports = {mongoose};