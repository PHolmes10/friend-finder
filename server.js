var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require(path.join(__dirname, '/app/routing/htmlRoutes'))(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});