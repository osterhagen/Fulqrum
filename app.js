//Main Server
var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));  //Will set port to computers designated
//environment port or port 5000 thousand if environment port is not defined


app.get('/scrape', function (req, res) {

    //All the web scraping magic will happen here

})

app.listen(app.get('port'), function () {
    console.log("Node app is running on port", app.get("port"));
});

//exports = module.exports = app;