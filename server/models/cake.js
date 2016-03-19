var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CakeSchema = new Schema({
    user: String,
    name: String,
    image: String,
    croppedImage:String,
    ingredients: [String],
    steps: [String]
})

module.exports = mongoose.model("Cake", CakeSchema);

