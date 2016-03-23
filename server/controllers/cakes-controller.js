var Cake = require("../models/cake");
var fs = require("fs");
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports.list = function (req, res) {
    Cake.find({"user": req.params.user}, function (err, cakes) {
        res.json(cakes);
    });
}

module.exports.get = function (req, res) {
    Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
        res.json(cake);
    })
}

module.exports.create = function (req, res) {
    var cake = new Cake();
    cake.user = req.body.user;
    cake.name = req.body.name;
    cake.description = req.body.description;
    cake.ingredients = req.body.ingredients;
    cake.steps = req.body.steps;
    cake.save(function (err, cake) {
        res.json(cake);
    });
}

module.exports.remove = function (req, res) {
    Cake.remove({"_id": req.params.id, "user": req.params.user}, function (err) {
        res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
    });
}

module.exports.addDetail = function (req, res) {
    Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
        if (req.params.type == "desc") {
            cake.description = req.body.value;
        } else if (req.params.type == "ingr") {
            cake.ingredients.push(req.body.value);
        } else if (req.params.type == "step") {
            cake.steps.push(req.body.value);
        }
        cake.save();
        res.json(cake);
    });
}

module.exports.removeDetail = function (req, res) {
    Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
        if (req.params.type == "ingr") {
            //var arrayElement = "ingredients." + req.params.index;
            //cake.update({}, {$unset: {arrayElement: }})
        }
    })
}

module.exports.addImage = function (req, res) {
    Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
        var path = "image." + req.body.dataType;
        fs.writeFile(path, new Buffer(req.body.data, "base64"), function (result, err) {
            cloudinary.uploader.upload(path, function (result) {
                cake.image = result.url;
                cake.croppedImage = cake.image.replace("image/upload/", "image/upload/c_fill,h_480,w_480/");
                cake.save(function (err, cake) {
                    res.json(cake);
                    fs.unlink(path);
                });
            });
        });
    });
}