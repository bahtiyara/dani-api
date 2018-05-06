const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

try {
    mongoose.connect('mongodb://localhost:27017/dani' || 'mongodb://bahtiyar_a:123456@ds014658.mlab.com:14658/dani');
} catch (error) {
    
}


module.exports = {mongoose};

// 'mongodb://localhost:27017/dani'