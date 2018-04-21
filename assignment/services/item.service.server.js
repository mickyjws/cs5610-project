module.exports = function (app) {
    var itemModel = require("../model/item/item.model.server");

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../dist/assets/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/user/:userId/item", createItem);
    app.get("/api/item", findAllItems);
    app.get("/api/item6", findLatestSixItems);
    app.get("/api/item/:itemId", findItemById);
    app.get("/api/item/:itemId/watcher", findItemWatcher);
    app.get("/api/user/:userId/item", findAllSellingItemsForUser);
    app.put("/api/item/:itemId", updateItem);
    app.delete("/api/item/:itemId", deleteItem);

    function uploadImage(req, res) {

        var width = req.body.width;
        var myFile = req.file;
        var userId = req.body.userId;
        var itemId = req.body.itemId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;


        var item = {
            url: "assets/uploads/" + filename
        };

        itemModel.findItemById(itemId).then(function (item) {
            item.url = '/assets/uploads/' + filename;
            itemModel.updateItem(itemId, item).then(function (status) {
                var callbackUrl = "/user/item/" + itemId;
                res.redirect(callbackUrl);
            }, function (err) {
            });
        });

    }

    function createItem(req, res) {
        const userId = req.params["userId"];
        const newItem = req.body;
        itemModel.createItem(userId, newItem)
            .then(function (item) {
                res.json(item);
            });
    }

    function findAllItems(req, res) {
        itemModel.findAllItems()
            .then(function (items) {
                res.json(items);
            });
    }

    function findAllSellingItemsForUser(req, res) {
        const userId = req.params["userId"];
        itemModel.findAllSellingItemsForUser(userId)
            .then(function (items) {
                res.json(items);
            });
    }

    function findLatestSixItems(req, res) {
        itemModel.findLatestSixItems()
            .then(function (items) {
                res.json(items);
            });
    }

    function findItemById(req, res) {
        const itemId = req.params["itemId"];
        itemModel.findItemById(itemId)
            .then(function (item) {
                res.json(item);
            });
    }

    function findItemWatcher(req, res) {
        const itemId = req.params["itemId"];
        itemModel.findItemWatcher(itemId)
            .then(function (watchers) {
                res.json(watchers);
            });
    }

    function updateItem(req, res) {
        const itemId = req.params["itemId"];
        const newItem = req.body;
        itemModel.updateItem(itemId, newItem).then(function (item) {
                res.json(item);
            }
        );
    }

    function deleteItem(req, res) {
        const itemId = req.params["itemId"];
        itemModel.deleteItem(itemId).then(function (status) {
                res.send(status);
            }
        );
    }

};
