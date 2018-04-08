var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("User", UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

var api = {
  findUserByFacebookId: findUserByFacebookId
};

// Creates a new user instance
function createUser(user) {
  return UserModel.create(user);
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
  return UserModel.update({_id: userId}, user);
}

// Removes user instance whose _id is equal to parameter userId
function deleteUser(userId) {
  return UserModel.remove({_id: userId});
}

// Retrieve a user by their facebook ID
function findUserByFacebookId(facebookId) {
  return UserModel.findOne({'facebook.id': facebookId});
}


module.exports = UserModel;
