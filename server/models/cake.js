var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DetailSchema = new Schema({
    index: Number,
    value: String
})

var CakeSchema = new Schema({
    isPublic: Boolean,
    user: String,
    name: String,
    image: String,
    croppedImage: String,
    servings: Number,
    readyInMinutes: Number,
    preparationMinutes: Number,
    cookingMinutes: Number,
    description: String,
    ingredients: [DetailSchema],
    steps: [DetailSchema]
})

module.exports = mongoose.model("Cake", CakeSchema);

