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
    //Scrape Yelp
    scrapeYelp(company, reviews, function (error) {
        //When done scraping print reviews
        var i = 0;
        while (i < reviews.length) {
            printReview(reviews[i], i+1);
            i++;
        }
        //Total number of reviews
        console.log("Final Number of Reviews: " + reviews.length);
    });
    
}

function scrapeYelp(company, reviews, cb) {
    var companyPageURL;

    findYelpCompanyPage(company, function (error, data) {
        //Manipulate URL to match yelps expected GET request
        companyPageURL = data;
        //Note company page url has format https://www.yelp.com/biz/<CompanyName>?osq=<OriginalSearchQuery>
        //To sort reviews from newest to oldest change argument osq argument to sort_by=date_desc
        var companyPageURLByDate = String(companyPageURL).slice(0, String(companyPageURL).lastIndexOf("?")+1);
        companyPageURLByDate += "start=";
        //Go fill the reviews data structure with reviews
        gatherYelpReviews(company, reviews, companyPageURLByDate, function (error) {
            console.log("Yelp Scrape Complete");
            cb(null);
        });

    });
}

function gatherYelpReviews(company, reviews, url, cb) {
    var maxReviews = 100;
    var reviewStartIndex = 0;
    var plainURL = url;
    url += reviewStartIndex;
    reviewStartIndex += 20;
    console.log(url);
    request(url, cheerioYelpParser);
    function cheerioYelpParser(error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            var $ = cheerio.load(html);
            var i = 0;
            //Count usernames to find number of reviews
            var numReviews = $('div.review a.user-display-name').get().length;
            if (numReviews == 0  || reviewStartIndex >maxReviews) {
                cb(null);
            }
            while (i < numReviews) {
                var review = new Object();
                review.origin = url;
                review.name_of_reviewer = $('div.review a.user-display-name').eq(i).text();
                //console.log("Name of Reviewer: " + review.name_of_reviewer);
                review.date_of_review = $('div.review div.biz-rating span.rating-qualifier').eq(i).text().trim();
                //console.log("Date: " + review.date_of_review);
                review.review = $('div.review div.review-content p').eq(i).text();
                //console.log("Review: " + review.review);
                review.rating = $('div.review div.i-stars').eq(i).attr('title');
                //console.log("Stars: " + review.rating);
                review.useful = $('div.review a[rel="useful"] span.count').eq(i).text();
                //useful is blank if 0
                if (String(review.useful).length === 0) {
                    review.useful = "0";
                }
                //console.log("Useful: " + review.useful);
                reviews.push(review);
                //printReview(review);
                i++;
                
            }//while
            if (reviewStartIndex < maxReviews) {

                url = plainURL;
                url += reviewStartIndex;
                reviewStartIndex += 20;
                console.log(url);
                console.log("Number of Reviews: " + reviews.length);
                request(url, cheerioYelpParser);
            } else {
                cb(null);
            }
        } else {
            cb(null);
        }
    }

    
}

function printReview(review, reviewNumber) {
    console.log("");
    console.log("---------------------------");
    console.log("---------------------------");
    console.log("REVIEW " + reviewNumber);
    console.log("---------------------------");
    console.log("---------------------------");
    console.log("URL: " + review.origin);
    console.log("Name of Reviewer: " + review.name_of_reviewer);
    console.log("Date: " + review.date_of_review);
    console.log("Review: " + review.review);
    console.log("Stars: " + review.rating);
    console.log("Useful: " + review.useful);
    console.log("---------------------------");
    console.log("---------------------------");
    console.log("");

}

function findYelpCompanyPage(company, cb) {
    var companyName = company.name;
    var address = company.city;

    //First we will search yelp for the business
    var url = "https://www.yelp.com/search?";
    url += "find_desc=" + companyName;
    url += "&find_loc=" + address;
    //console.log("url: " + url);
    request(url, function (error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            //console.log(html);
            var $ = cheerio.load(html);

            //As of 9/29/17 to identify yelps first search result that is not an ad is...
            //The first list entry with this class <li class="regular-search-result">
            //Then it is the anchor tag with the class <biz-name> and we need the href
            companyURL = "https://www.yelp.com"
            companyURL += $('li.regular-search-result a').attr('href');
            //console.log(companyURL);
            cb(null, companyURL);

        } else {
            cb("ERROR");
        }
    });
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