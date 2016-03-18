var Cake = require("../models/cake");
var Image = require("../models/image");

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
        if (req.body.type == "ingr") {
            cake.ingredients.push(req.body.name);
        }
        else if (req.body.type == "step") {
            cake.steps.push(req.body.name);
        }
        cake.save();
        console.log(cake);
        res.json(cake);
    });
}

module.exports.addImage = function (req, res) {
    Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
        console.log("test");
        res.json(cake);
    });
    //var img = new Image();
    //img.img.data = req.body.data;
    //img.img.contentType = req.body.dataType;
    //img.save(function (err, img) {
    //    console.log(img._id);
    //    res.json(img._id);
    //    //Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
    //    //});
    //});
}