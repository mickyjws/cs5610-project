var mongoose = require("mongoose");
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var ItemSchema = mongoose.Schema({
    _seller: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    category: {type: String, enum: ['FURNITURE', 'TEXTBOOK', 'OTHERS']},
    name: String,
    price: {type: SchemaTypes.Double},
    url: {type: String, default: 'https://www.happyceliac.com/wp-content/uploads/2018/02/placeholder-image.png'},
    width: String,
    height: String,
    title: String,
    description: String,
    is_new: {type: Boolean, default: true},
    watchers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    watcher_count: {type: Number, default: 0},
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.item'});

module.exports = ItemSchema;
