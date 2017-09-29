var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Review = require("../Data Structures/Review.js");

var googleCustomSearchAPIKey = "AIzaSyBDYvvNE7hz7IuQxPBKPy6XD8M1kKI5aTM";
var googleSearchEngineAPI = "000374492695807119950:gsm88fb1qaq";

exports.freshScrape = freshScrape;
//Expects a company object
function freshScrape(company) {
    var reviews = [];
    scrapeYelp(company, reviews);
}

function scrapeYelp(company, reviews) {
    var companyName = company.name;
    var address = company.city;

    //First we will search yelp for the business
    var url = "https://www.yelp.com/search?";
    url += "find_desc=" + companyName;
    url += "&find_loc=" + address;
    console.log("url: " + url);
    request(url, function (error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            //console.log(html);
            var $ = cheerio.load(html);

            //As of 9/29/17 to identify yelps first search result that is not an add is...
            //The first list entry with this class <li class="regular-search-result">
            //Then it is the anchor tag with the class <biz-name> and we need the href
            
        }
    })

}


var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseXML);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
};

function googleSearchScrape(companyName) {

    //Default url for rest API
    var url = "https://www.googleapis.com/customsearch/v1?";
    //Add our API token
    url += "key=" + customSearchAPIKey;
    //Add our search engine key
    url += "&cx=" + searchEngineAPI;
    //Add queries
    url += "&q=" + companyName;

    console.log("Searching for: " + companyName);

    //Make an http get request
    /*var client = new HttpClient();
    client.get(url, function (response) {
        var jsonResponse = JSON.parse(response);
        //console.log(jsonResponse);
        for (var i = 0; i < jsonResponse["items"].length; i++) {
            var item = jsonResponse.items[i];
            console.log(item["htmlFormattedUrl"]);
        }
    });*/
}