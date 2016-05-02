var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DetailSchema = new Schema({
    index: Number,
    value: String
})

var CakeSchema = new Schema({
    isPublic: Boolean,
    isFavorite: Boolean,
    user: String,
    name: String,
    image: String,
    croppedImage: String,
    description: String,
    ingredients: [DetailSchema],
    steps: [DetailSchema]
})

module.exports = mongoose.model("Cake", CakeSchema);

