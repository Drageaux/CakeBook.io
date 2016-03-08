var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    cakesController = require("./server/controllers/cakes-controller.js");

mongoose.connect("mongodb://localhost:27017/cake-book");

app.use(bodyParser.json());

// Resource loading
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/app", express.static(__dirname + "/client/app"));
app.use("/templates", express.static(__dirname + "/client/app/templates"));
app.use("/assets", express.static(__dirname + "/client/assets"));

// REST API
app.get("/api/cakes", cakesController.list);
app.get("/api/cake/:id", cakesController.get);
app.post("/api/cakes", cakesController.create);
app.get("/api/cake/delete/:id", cakesController.remove);

// All routes will serve this index page
app.use("/*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, '0.0.0.0', function () {
    console.log("I'm listening")
});