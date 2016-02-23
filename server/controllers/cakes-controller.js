var Cake = require("../models/cake");

module.exports.list = function (req, res) {
    Cake.find(function (err, results) {
        res.json(results);
    });
}

module.exports.create = function (req, res) {
    console.log(req.body);
    var cake = new Cake();
    cake.name = req.body.name;

    cake.save(function (err) {
        if (err) {
            res.send(err);
        }

        res.json({message: "Cake create!"});
    })
}