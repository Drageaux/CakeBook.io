var Image = require("../models/image");
var fs = require("fs");
var id = "56ea28ba2d0830e012f826d1";

module.exports.getImage = function (req, res) {
    Image.findById(id, function (err, img) {
        if (err) return console.log(err);
        var base64 = (img.img.data.toString('base64'));
        res.json(base64);
        //});
        //res.json(img.img)
    });
}

module.exports.uploadImage = function (req, res) {
    var img = new Image();
    var path = "client/assets/custom/images/11041817_969486119731278_9135160827594352226_n.jpg";
    img.img.data = fs.readFileSync(path);
    img.img.contentType = "jpg";
    img.save(function (err, img) {
        res.json(img);
    });
}