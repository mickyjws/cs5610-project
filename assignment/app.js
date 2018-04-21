module.exports = function (app) {
    require("./services/user.service.server")(app);
    require("./services/item.service.server")(app);
    require("./model/models.server");
};
