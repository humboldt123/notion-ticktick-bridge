var express = require("express");
var request = require("request");
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

require('dotenv').config();

var app = express()
    .use(express.static(__dirname + "/public"))
    .use(cors())
    .use(cookieParser());

var ticktick = require("./routes/ticktick_auth.js");
var notion = require("./routes/notion_auth.js");

app.use("/auth/ticktick", ticktick);
//app.use("/auth/notion", notion);

app.get("/", (req, res) => {
    // serve landing page ✨
    res.sendFile(__dirname + "/public/index.html");
});

// listen for requests
var listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});  