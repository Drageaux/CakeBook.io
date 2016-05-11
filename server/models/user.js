var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userId: String,
    name: String,
    firstName: String,
    lastName: String,
    image: String,
    croppedImage: String
})

module.exports = mongoose.model("User", UserSchema);

