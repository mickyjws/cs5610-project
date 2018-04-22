var mongoose = require("mongoose");
var ItemSchema = require("./item.schema.server");
var ItemModel = mongoose.model("ItemModel", ItemSchema);


ItemModel.createItem = createItem;
ItemModel.findAllItems = findAllItems;
ItemModel.findLatestSixItems = findLatestSixItems;
ItemModel.findItemById = findItemById;
ItemModel.findAllSellingItemsForUser = findAllSellingItemsForUser;
ItemModel.findItemWatcher = findItemWatcher;
ItemModel.updateItem = updateItem;
ItemModel.deleteItem = deleteItem;
ItemModel.watchCountIncrement = watchCountIncrement;
ItemModel.watchCountDecrement = watchCountDecrement;


function createItem(userId, item) {
    item._seller = userId;
    return ItemModel.create(item);
}

function findAllItems() {
    return ItemModel.find().populate('_seller').sort({dateCreated: -1});
    ;
}

function findLatestSixItems() {
    return ItemModel.find().populate('_seller').limit(6).sort({dateCreated: -1});
}

function findItemById(itemId) {
    return ItemModel.findById(itemId).populate('_seller');
}

function findAllSellingItemsForUser(userId) {
    return ItemModel.find({_seller: userId}).sort({dateCreated: -1});
}

function findItemWatcher(itemId) {
    return ItemModel.findOne({_id: itemId}).watchers;
}

function updateItem(itemId, item) {
    return ItemModel.updateOne({_id: itemId}, item);
}

function deleteItem(itemId) {
    return ItemModel.deleteOne({_id: itemId});
}

function watchCountIncrement(itemId) {
    // return ItemModel.updateOne({_id: itemId}, { $inc: { watcher_count: 1 }});
    return ItemModel.findByIdAndUpdate(itemId, {$inc: {watcher_count: 1}});
}

function watchCountDecrement(itemId) {
    return ItemModel.findByIdAndUpdate(itemId, {$inc: {watcher_count: -1}});
}

module.exports = ItemModel;
