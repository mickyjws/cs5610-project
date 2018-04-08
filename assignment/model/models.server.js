var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://127.0.0.1:27017/project');

var db = mongoose.connect('mongodb://guest:guest@ds029705.mlab.com:29705/heroku_l1tgz2xd');
module.exports = db;
