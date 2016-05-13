var User = require("../models/user");

module.exports.get = function (req, res) {
    User.findOne({"userId": req.params.id}, function (err, user) {
        if (err) {
            console.log(err)
        };
        res.json(user);
    });
}

module.exports.create = function (req, res) {
    var user = new User();
    user.userId = req.body.userId;
    user.userUrl = req.body.userId;
    user.email = req.body.email;
    user.nickname = req.body.nickname;
    user.name = req.body.name;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.save(function (err, user) {
        if (err) {
            console.log(err);
        }
        console.log("New user: " + user);
        res.json(user);
    });
}

module.exports.updateImportant = function (req, res) {
    User.findOne({"userId": req.body.userId}, function (err, user) {
        if (user.email == null) {
            user.email = req.body.email;
        }
        if (user.userUrl == null) {
            user.userUrl = req.body.userId;
        }
        if (user.nickname == null) {
            user.nickname = req.body.nickname;
        }
        user.save(function (err, user) {
            if (err) {
                console.log(err);
            }
            console.log("Updated user: " + user);
            res.json(user);
        });
    })
}