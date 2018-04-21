const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require("../model/user/user.model.server");
const itemModel = require("../model/item/item.model.server");
const bcrypt = require('bcrypt-nodejs');

module.exports = function (app) {

    app.post("/api/user", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    app.put("/api/user/:userId/add/:itemId", addItemToWatchList);
    app.put("/api/user/:userId/remove/:itemId", removeItemFromWatchList);
    app.get("/api/user/:userId/watchlist", findWatchListForUser);


    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.post('/api/loggedIn', loggedin);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id).then(function (user) {
                done(null, user);
            }, function (error) {
                done(error, null);
            }
        );
    }

    function localStrategy(username, password, done) {
        userModel.findUserByUsername(username).then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }, function (err) {
            if (err) {
                return done(err);
            }
        });
    }

    function login(req, res) {
        const user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        userModel.findUserByUsername(user.username).then(function (existedUser) {
            if (existedUser) {
                res.status(400).send("Username already in use");
                return;
            } else {
                userModel.createUser(user).then(function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                });
            }
        });
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function createUser(req, res) {
        const newUser = req.body;
        userModel.createUser(newUser)
            .then(function (user) {
                res.json(user);
            });
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers().then(function (users) {
                res.json(users);
            }
        );
    }

    function findWatchListForUser(req, res) {
        const userId = req.params["userId"];
        userModel.findWatchListForUser(userId)
            .then(function (items) {
                res.json(items);
            });
    }

    function findUserByUsername(req, res) {
        const username = req.query["username"];
        userModel.findUserByUsername(username).then(function (user) {
                res.json(user);
            }
        );
    }

    function findUserByCredentials(req, res) {
        const username = req.query["username"];
        const password = req.query["password"];
        userModel.findUserByCredentials(username, password).then(function (user) {
                res.json(user);
            }
        );
    }

    function findUserById(req, res) {
        const userId = req.params["userId"];
        userModel.findUserById(userId).then(function (user) {
                res.json(user);
            }
        );
    }

    function updateUser(req, res) {
        const userId = req.params["userId"];
        const newUser = req.body;
        userModel.updateUser(userId, newUser).then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(404).send(err);
            }
        );
    }

    function deleteUser(req, res) {
        const userId = req.params["userId"];
        userModel.deleteUser(userId).then(function (status) {
            res.status(200).send(status);
        }, function (err) {
            res.status(404).send(err);
        });
    }

    function addItemToWatchList(req, res) {
        const userId = req.params["userId"];
        const itemId = req.params["itemId"];
        userModel.addItemToWatchList(userId, itemId).then(function (status) {
                itemModel.watchCountIncrement(itemId).then(function (status) {
                    res.status(200).send(status);
                });
            }, function (err) {
                res.status(404).send(err);
            }
        );
    }

    function removeItemFromWatchList(req, res) {
        const userId = req.params["userId"];
        const itemId = req.params["itemId"];
        userModel.removeItemFromWatchList(userId, itemId).then(function (status) {
                itemModel.watchCountDecrement(itemId).then(function (status) {
                    res.status(200).send(status);
                });
            }, function (err) {
                res.status(404).send(err);
            }
        );
    }
};
