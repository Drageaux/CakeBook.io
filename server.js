var express = require("express"),
    app = express();

app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/app", express.static(__dirname + "/client/app"));
app.use("/templates", express.static(__dirname + "/client/app/templates"));
app.use("/assets", express.static(__dirname + "/client/assets"));

// All routes will serve this index page
app.get("/*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening")
})