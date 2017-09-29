var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var googleCustomSearchAPIKey = "AIzaSyBDYvvNE7hz7IuQxPBKPy6XD8M1kKI5aTM";
var googleSearchEngineAPI = "000374492695807119950:gsm88fb1qaq";

exports.freshScrape = freshScrape;
//Expects a company object
function freshScrape(company) {
    var reviews = [];
    scrapeYelp(company, reviews);
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