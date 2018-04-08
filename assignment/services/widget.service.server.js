module.exports = function (app) {
  var widgetModel = require("../model/widget/widget.model.server");

  var multer = require('multer');
  var upload = multer({dest: __dirname + '/../../dist/assets/uploads'});

  app.post("/api/upload", upload.single('myFile'), uploadImage);
  app.put("/api/page/:pageId/widget", sortWidgets);
  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var filename = myFile.filename;

    widgetModel.findWidgetById(widgetId).then(function (widget) {
      widget.width = width;
      widget.url = '/assets/uploads/' + filename;
      widgetModel.updateWidget(widgetId, widget).then(function (status) {
        var callbackUrl = "/user/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
        res.redirect(callbackUrl);
      }, function (err) {
      });
    });
  }

  function createWidget(req, res) {
    const pageId = req.params["pageId"];
    const newWidget = req.body;
    widgetModel.createWidget(pageId, newWidget)
      .then(function (widget) {
        res.json(widget);
      });
  }

  function findAllWidgetsForPage(req, res) {
    const pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function (widgets) {
        res.json(widgets);
      });
  }

  function findWidgetById(req, res) {
    const widgetId = req.params["widgetId"];
    widgetModel.findWidgetById(widgetId)
      .then(function (widget) {
        res.json(widget);
      });
  }

  function updateWidget(req, res) {
    const widgetId = req.params["widgetId"];
    const newWidget = req.body;
    widgetModel.updateWidget(widgetId, newWidget).then(function (status) {
        res.send(status);
      }
    );
  }

  function deleteWidget(req, res) {
    const widgetId = req.params["widgetId"];
    widgetModel.deleteWidget(widgetId).then(function (status) {
        res.send(status);
      }
    );
  }

  function sortWidgets(req, res) {
    const pageId = req.params["pageId"];
    const start = req.query["startIndex"];
    const end = req.query["endIndex"];

    widgetModel.reorderWidget(pageId, start, end).then(
      function (status) {
        res.status(200);
      }, function (error) {
        res.status(404);
      });
  }

};
