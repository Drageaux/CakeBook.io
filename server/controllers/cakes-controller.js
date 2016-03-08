var Cake = require("../models/cake");

module.exports.list = function (req, res) {
    Cake.find({}, function (err, cakes) {
        res.json(cakes);
    });
}

module.exports.get = function (req, res) {
    Cake.findById(req.params.id, function (err, cake) {
        res.json(cake);
    })
}

module.exports.create = function (req, res) {
    var cake = new Cake();
    cake.name = req.body.name;
    cake.ingredients = req.body.ingredients;
    cake.steps = req.body.steps;

    cake.save(function (err, cake) {
        res.json(cake);
    });
}

module.exports.remove = function (req, res) {
    Cake.remove({"_id" : req.params.id}, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
}