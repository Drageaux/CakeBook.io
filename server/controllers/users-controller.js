var User = require("../models/user");

module.exports.get = function (req, res) {
    User.findOne({"userId": req.params.userId}, function (err, user) {
        if (err) {
            console.log(err)
        }
        ;
        res.json(user);
    });
}

module.exports.create = function (req, res) {
    var user = new User();
    user.userId = req.body.userId;
    user.email = req.body.userId;
    user.nickname = req.body.nickname;
    user.name = req.body.name;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.save(function (err, user) {
        if (err) {
            console.log(err)
        }
        res.json(user);
    });
}

module.exports.update = function (req, res) {
    User.findOneAndUpdate(
        {"userId": req.body.userId}, {
            $set: {
                "email": req.body.email,
                "nickname": req.body.nickname,
                "name": req.body.name,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName
            }
        }, {
            new: true,
            upsert: true
        }, function (err, user) {
            console.log(user)
        })
}