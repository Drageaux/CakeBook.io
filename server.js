var express = require("express"),
    app = express();

app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/assets", express.static(__dirname + "/client/assets"));
app.use("/app", express.static(__dirname + "/client/app"));


app.get("/*", function (req, res) {
    res.sendfile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening")
})