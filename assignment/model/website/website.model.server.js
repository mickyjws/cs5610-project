var mongoose = require("mongoose");
var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model("Website", WebsiteSchema);
var UserModel = require("../user/user.model.server");


WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

// Creates a new website instance for user whose _id is userId
function createWebsiteForUser(userId, website) {
  // return WebsiteModel.create(website).then(function (resultWebsite) {
  //     UserModel.findUserById(userId).then(function (user) {
  //         user.websites.push(resultWebsite);
  //         return user.save();
  //       }
  //     );
  //   }
  // );
  website._user = userId;
  return WebsiteModel.create(website);
}

// Retrieves all website instances for user whose  _id is userId
function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({_user: userId});
}


// Retrieves single website instance whose _id is websiteId
function findWebsiteById(websiteId) {
  return WebsiteModel.findById(websiteId);
}

// Updates website instance whose _id is websiteId
function updateWebsite(websiteId, website) {
  return WebsiteModel.update({_id: websiteId}, website);
}


// Removes website instance whose _id is websiteId
function deleteWebsite(websiteId) {
  return WebsiteModel.remove({_id: websiteId});
}


module.exports = WebsiteModel;
