var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userId: String,
    email: String,
    nickname: String,
    name: String,
    firstName: String,
    lastName: String,
    image: String
})

module.exports = mongoose.model("User", UserSchema);

