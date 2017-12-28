var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/do-more');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
