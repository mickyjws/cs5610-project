var mongoose = require("mongoose");
var PageSchema = require("./page.schema.server");
var PageModel = mongoose.model("Page", PageSchema);
var WebsiteModel = require("../website/website.model.server");


PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;


function createPage(websiteId, page) {
  // return PageModel.create(page).then(function (page) {
  //   WebsiteModel.findWebsiteById(websiteId).then(function (website) {
  //     website.pages.push(page);
  //     return website.save();
  //   });
  // });
  page._website = websiteId;
  return PageModel.create(page);
}


function findAllPagesForWebsite(websiteId) {
  return PageModel.find({_website: websiteId});
}


function findPageById(pageId) {
  return PageModel.findById(pageId);
}


function updatePage(pageId, page) {
  return PageModel.update({_id: pageId}, page);
}

function deletePage(pageId) {
  return PageModel.remove({_id: pageId});
}


module.exports = PageModel;
