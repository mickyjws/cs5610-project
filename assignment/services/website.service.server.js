module.exports = function (app) {

  var websiteModel = require("../model/website/website.model.server");

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  function createWebsite(req, res) {
    const userId = req.params["userId"];
    const newWebsite = req.body;
    websiteModel.createWebsiteForUser(userId, newWebsite)
      .then(function (website) {
        res.json(website);
      }, function (err) {
        res.status(404).send(err);
      });
  }

  function findAllWebsitesForUser(req, res) {
    const userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId).then(function (websites) {
        res.json(websites);
      }
    );
  }

  function findWebsiteById(req, res) {
    const websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId).then(function (website) {
        res.json(website);
      }
    );
  }

  function updateWebsite(req, res) {
    const websiteId = req.params["websiteId"];
    const newWebsite = req.body;
    websiteModel.updateWebsite(websiteId, newWebsite).then(function (status) {
        res.send(status);
      }
    );
  }

  function deleteWebsite(req, res) {
    const websiteId = req.params["websiteId"];
    websiteModel.deleteWebsite(websiteId).then(function (status) {
        res.send(status);
      }
    );
  }
};
