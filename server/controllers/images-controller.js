var Image = require("../models/image");
var fs = require("fs");

module.exports.uploadImage = function (req, res) {
    var img = new Image();
    var path = "client/assets/custom/images/11041817_969486119731278_9135160827594352226_n.jpg";
    img.img.data = fs.readFileSync(path);
    img.img.contentType = "jpg";
    img.save(function (err, img) {
        res.json(img);
    });
}