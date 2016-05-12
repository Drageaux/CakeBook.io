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
    user.name = req.body.name;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.image = req.body.image;
    user.croppedImage = req.body.croppedImage;
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
                "userId": req.body.userId,
                "name": req.body.name,
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "image": req.body.image,
                "croppedImage": req.body.croppedImage
            }
        }, {
            new: true,
            upsert: true
        }, function (err, user) {
            console.log(user)
        })
}