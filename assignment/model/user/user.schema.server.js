var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    type: {type: String, enum: ['ADMIN', 'SELLER', 'BUYER']},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    gender: {type: String, enum: ['MALE', 'FEMALE', 'OTHER', '']},
    address: String,
    city: String,
    state: String,
    zip: Number,
    watchList: [{type: mongoose.Schema.Types.ObjectId, ref: 'ItemModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.user'});

module.exports = UserSchema;
