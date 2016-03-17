var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    cakesController = require("./server/controllers/cakes-controller.js"),
    imagesController = require("./server/controllers/images-controller.js");

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/cake-book");

app.use(bodyParser.json());

// Resource loading
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/app", express.static(__dirname + "/client/app"));
app.use("/templates", express.static(__dirname + "/client/app/templates"));
app.use("/assets", express.static(__dirname + "/client/assets"));

// REST API
app.get("/api/:user/cakes", cakesController.list);
app.get("/api/:user/cake/:id", cakesController.get);
app.post("/api/:user/cakes", cakesController.create);
app.delete("/api/:user/cake/:id/", cakesController.remove);
app.post("/api/:user/cake/:id/detail", cakesController.addDetail);
app.get("/api/:user/cake/:id/image", imagesController.getImage);
app.get("/api/:user/cake/:id/upload", imagesController.uploadImage);

// All routes will serve this index page
app.use("/*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 5000, '0.0.0.0', function () {
    console.log("I'm listening")
});