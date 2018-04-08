var mongoose = require("mongoose");
var WebsiteSchema = require('../website/website.schema.server');

var UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  facebook: {
    id: String,
    token: String
  },
  websites: [WebsiteSchema],
  dateCreated: {type: Date, default: Date.now}
}, {collection: 'assignment.user'});

module.exports = UserSchema;
