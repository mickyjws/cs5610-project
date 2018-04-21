var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.createUser = createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findWatchListForUser = findWatchListForUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

UserModel.addItemToWatchList = addItemToWatchList;
UserModel.removeItemFromWatchList = removeItemFromWatchList;

// Creates a new user instance
function createUser(user) {
    return UserModel.create(user);
}

// Retrieves all user instances
function findAllUsers() {
    return UserModel.find();
}

function findWatchListForUser(userId) {
    return UserModel.findById(userId).populate('watchList').sort({dateCreated: -1});
    ;
}

// Retrieves a user instance whose _id is equal to parameter userId
function findUserById(userId) {
    return UserModel.findById(userId);
}

// Retrieves a user instance whose username is equal to parameter username
function findUserByUsername(username) {
    return UserModel.findOne({username: username});
}

// Retrieves a user instance whose username and password are equal to parameters userId and password
function findUserByCredentials(username, password) {
    return UserModel.findOne({username: username, password: password});
}

// Updates user instance whose _id is equal to parameter userId
function updateUser(userId, user) {
    return UserModel.updateOne({_id: userId}, user);
}

// Removes user instance whose _id is equal to parameter userId
function deleteUser(userId) {
    return UserModel.deleteOne({_id: userId});
}

function addItemToWatchList(userId, itemId) {
    return UserModel.updateOne({_id: userId}, {$addToSet: {watchList: [itemId]}});
}

function removeItemFromWatchList(userId, itemId) {
    return UserModel.updateOne({_id: userId}, {$pull: {watchList: itemId}});
}


module.exports = UserModel;
