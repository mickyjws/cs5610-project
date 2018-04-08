module.exports = function (app) {

  var pageModel = require("../model/page/page.model.server");

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);


  function createPage(req, res) {
    const websiteId = req.params["websiteId"];
    const newPage = req.body;
    pageModel.createPage(websiteId, newPage)
      .then(function (page) {
        res.json(page);
      });
  }

  function findAllPagesForWebsite(req, res) {
    const websiteId = req.params["websiteId"];
    pageModel.findAllPagesForWebsite(websiteId)
      .then(function (pages) {
        res.json(pages);
      });
  }

  function findPageById(req, res) {
    const pageId = req.params["pageId"];
    pageModel.findPageById(pageId)
      .then(function (page) {
        res.json(page);
      });
  }

  function updatePage(req, res) {
    const pageId = req.params["pageId"];
    const newPage = req.body;
    pageModel.updatePage(pageId, newPage)
      .then(function (status) {
        res.send(status);
      });
  }

  function deletePage(req, res) {
    const pageId = req.params["pageId"];
    pageModel.deletePage(pageId)
      .then(function (status) {
        res.send(status);
      });
  }
};
