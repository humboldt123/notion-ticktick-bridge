var express = require('express')
var request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

const auth = express.Router();

var client_id = process.env.TICKTICK_CLIENT_ID;
var client_secret = process.env.TICKTICK_CLIENT_SECRET;
var redirect_uri = `http://localhost:${process.env.PORT}/auth/ticktick/callback`; // temp, debug
var scope = "tasks:write tasks:read";


auth.get("/", (req, res) => {
    var state = randomString();
    res.redirect("https://ticktick.com/oauth/authorize?" +
        querystring.stringify({
            client_id: client_id,
            scope: scope,
            state: state,
            redirect_uri: redirect_uri,
            response_type: "code"
        })
    );
});

auth.get("/callback", (req, res) => {
    var code = req.query.code || null;
    var state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' + querystring.stringify({error: "state_mismatch"}));
    } else {
        var authOptions = {
            url: "https://ticktick.com/oauth/token",
            form: {
                client_id: client_id,
                client_secret: client_secret,
                code: code,
                grant_type: 'authorization_code',
                scope: scope,
                redirect_uri: redirect_uri,
            },
            headers: {'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))},
            json: true
        };
    
        request.post(authOptions, function(error, response, body) {
            if (response.statusCode === 200 && !error) {
                var accessToken = body["access_token"];
                console.log(accessToken)
                res.send("hi this works !");
                // do something here

                // var options = {
                //     url: "tiktick openapi call",
                //     headers: { 'Authorization': 'Bearer ' + accessToken }
                // };
                // res.redirect("/");
            }
        });
      }
});

var randomString = function(length) {
    return (
        Math.random().toString(26).substring(2, 20)
        + Math.random().toString(26).substring(2, 20)
        + Math.random().toString(26).substring(2, 20)
    ).substring(0, 16);
};

module.exports = auth;