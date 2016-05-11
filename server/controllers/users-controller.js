var User = require("../models/user");

module.exports.get = function (req, res) {
    User.findOne({"userId": req.params.userId}, function (err, user) {
        console.log(user);
        res.json(user);
    });
}

module.exports.create = function (req, res) {
    var user = new User();
    user.userId = req.body.userId;
    user.name = req.body.name;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.image = req.body.image;
    user.croppedImage = req.body.croppedImage;
    user.save(function (err, user) {
        res.json(user);
    });
}