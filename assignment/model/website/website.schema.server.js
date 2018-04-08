var mongoose = require('mongoose');
var PageSchema = require('../page/page.schema.server');

var WebsiteSchema = mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  description: String,
  pages: [PageSchema],
  dateCreated: Date,
}, {collection: 'assignment.website'});

module.exports = WebsiteSchema;
