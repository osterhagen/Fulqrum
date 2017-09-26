var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var customSearchAPIKey = "AIzaSyBDYvvNE7hz7IuQxPBKPy6XD8M1kKI5aTM";
var searchEngineAPI = "000374492695807119950:gsm88fb1qaq";

exports.freshScrape = freshScrape;
function freshScrape(companyName) {

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
    var client = new HttpClient();
    client.get(url, function (response) {
        console.log(response);
    });
}


var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}