var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model("Image", ImageSchema);

