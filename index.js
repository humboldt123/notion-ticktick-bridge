var express = require("express");
var request = require("request");
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var app = express()
    .use(express.static(__dirname + "/public"))
    .use(cors())
    .use(cookieParser());

var auth = require("./routes/auth.js");
app.use("/auth", auth);

app.get("/", (request, response) => {
    // serve landing page ✨
    response.sendFile(__dirname + "/public/index.html");
});

// listen for requests
const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});  