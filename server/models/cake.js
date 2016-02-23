var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CakeSchema = new Schema({
    id: Number,
    name: String,
    ingredients: [String],
    steps: [String]
})

module.exports = mongoose.model("Cake", CakeSchema);

