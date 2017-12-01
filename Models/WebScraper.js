/*
 * This will scrape and gather reviews about companies from
 * the internet
 */


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Analysis = require("./analysis_module/analysis.js");

//var Review = require("../Data Structures/Review.js");

var googleCustomSearchAPIKey = "AIzaSyBDYvvNE7hz7IuQxPBKPy6XD8M1kKI5aTM";
var googleSearchEngineAPI = "000374492695807119950:gsm88fb1qaq";

var maxReviews = 20;
exports.scrape = scrape;
function scrape(company, hasPriorAnalytics, cb) {
    //Subject to change based on how we want to receive the company name

    //TODO Check if company analytics are already in database

    if (hasPriorAnalytics === false) {
        freshScrape(company, function(reviews) {
            //The review will be returned in an array of objects
            //When done scraping print reviews
            for(var i = 0; i < reviews.length; i++) {
                if(i >= reviews.length-1) {
                    //Last review
                    console.log("Last Review");
                    Analysis.analyze(reviews[i], function(review) {

                        cb(reviews);
                    });
                    //cb(reviews);
                }else {
                    Analysis.analyze(reviews[i], function(review) {

                    });
                }

            }
            //cb(reviews);

        });
    } else {
        //TODO call WebScraper Method for when analytics already exist
    }

}

exports.freshScrape = freshScrape;
//Expects a company object
function freshScrape(company, cb) {
    var reviews = [];
    //Scrape Yelp
    scrapeYelp(company, reviews, function (error) {

        console.log("Final Number of Reviews: " + reviews.length);
        cb(reviews);
    });

}

exports.rescrape = rescrape;
function rescrape(company, reviews, cb) {
    var reviews = [];
    //Scrape Yelp
    scrapeYelp(company, reviews, function (error) {

    });

    //TODO Get all reviews and analytics currently stored for company
    //Compare to see what reviews already have analytics
    //Run analytics on reviews that do not already have them

}

function scrapeYelp(company, reviews, cb) {
    var companyPageURL;

    findYelpCompanyPage(company, function (error, data) {
        if(error === "ERROR") {
            cb(error);
            return;
        }
        //Manipulate URL to match yelps expected GET request
        companyPageURL = data;
        //Note company page url has format https://www.yelp.com/biz/<CompanyName>?osq=<OriginalSearchQuery>
        //To sort reviews from newest to oldest change argument osq argument to sort_by=date_desc
        var index = String(companyPageURL).lastIndexOf("?");
        console.log("url v2: " + companyPageURL);
        var companyPageURLByDate = String(companyPageURL).slice(0, String(companyPageURL).lastIndexOf("?")+1);
        if (index == -1) {
            companyPageURLByDate = companyPageURL;
        }
        if(companyPageURLByDate.charAt(companyPageURLByDate.length-1) != '?') {
            companyPageURLByDate+="?";
        }
        companyPageURLByDate += "start=";
        if (companyPageURLByDate.indexOf("undefined") !== -1) {
            cb(null);
            return;
        }
        

        //Go fill the reviews data structure with reviews
        gatherYelpReviews(company, reviews, companyPageURLByDate, function (error) {
    cb(null);
});

});
}

function gatherYelpReviews(company, reviews, url, cb) {
    //bugged because the url says start=0,
    var reviewStartIndex = 0;
    var plainURL = url;
    url += reviewStartIndex;
    reviewStartIndex += 20;
    console.log("Currently have 0 reviews scraped");
    console.log("Now scraping: " + url);
    console.log("\n");
    var ind = plainURL.indexOf("undefined");
    if (ind !== -1) {
        //bullshiet
        console.log("hi mom");
        reviews = null;
        cb(null);
        return;

    }
    else {
        request(url, cheerioYelpParser);

    function cheerioYelpParser(error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            var $ = cheerio.load(html);
            var i = 0;
            //Count usernames to find number of reviews
            var numReviews = $('div.review a.user-display-name').get().length;
            console.log("" + numReviews);
            if (numReviews == 0 || reviewStartIndex > maxReviews) {
                cb(null);
            }
            while (i < numReviews) {
                var review = new Object();
                //Set review parameters
                review.origin = url;

                review.name_of_reviewer = $('div.review a.user-display-name').eq(i).text();

                review.date_of_review = $('div.review div.biz-rating span.rating-qualifier').eq(i).text().trim();
                var updatedReviewIndex = String(review.date_of_review).indexOf("Updated review");
                if (updatedReviewIndex != -1) {
                    review.date_of_review = String(review.date_of_review).substring(0, updatedReviewIndex).trim();

                }
                var previousReviewIndex = String(review.date_of_review).indexOf("Previous review");
                if (previousReviewIndex != -1) {
                    review.date_of_review = String(review.date_of_review).substring(0, previousReviewIndex).trim();

                }

                review.review = $('div.review div.review-content p').eq(i).text();

                review.rating = $('div.review div.i-stars').eq(i).attr('title');
                review.rating = String(review.rating).substring(0, String(review.rating).indexOf(" "));

                review.useful = $('div.review a[rel="useful"] span.count').eq(i).text();
                //useful is blank if 0
                if (String(review.useful).length === 0) {
                    review.useful = "0";
                }
                //console.log("Useful: " + review.useful);
                reviews.push(review);
                //console.log(review);
                //printReview(review);
                i++;

            }//while
            if (reviewStartIndex < maxReviews && reviews.length % 20 === 0) {

                url = plainURL;
                url += reviewStartIndex;
                reviewStartIndex += 20;
                console.log("Currently have " + reviews.length + " reviews scraped");
                console.log("Now scraping: " + url);
                console.log("\n");
                request(url, cheerioYelpParser);
            } else {
                cb(null);
            }
        } else {
            cb(null);
        }
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
exports.findYelpCompanyPage = findYelpCompanyPage;
function findYelpCompanyPage(company, cb) {
    var companyName = company.name;
    var address = company.city;
    if (company.city == null) {
        address = company.zipcode;
    }
    //First we will search yelp for the business
    var url = "https://www.yelp.com/search?";
    url += "find_desc=" + companyName;
    url += "&find_loc=" + address;
    console.log("url: " + url);
    console.log("companyURL: " + company.companyURL);
    if (company.companyURL !== null && company.companyURL !== undefined) {
        request(company.companyURL, function () {
            cb(null, company.companyURL);
        })
    }
    else {
        request(url, function (error, response, html) {

            // First we'll check to make sure no errors occurred when making the request

            if (!error) {
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                //console.log(html);
                var $ = cheerio.load(html);

                //As of 9/29/17 to identify yelps first search result that is not an ad is...
                //The first list entry with this class <li class="regular-search-result">
                //Then it is the anchor tag with the class <biz-name> and we need the href
                var companyURL = "https://www.yelp.com"
                var addition = $('li.regular-search-result a').attr('href');
                var error;
                companyURL += addition;
                if (addition === undefined) {
                    error = "ERROR";
                }
                if (company.companyURL !== null && company.companyURL !== undefined) {
                    companyURL = company.companyURL;
                }
                console.log(companyURL);
                cb(error, companyURL);

            } else {
                console.log("DONE FUCKED");
                cb("ERROR");
            }
        });
    }
}


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
}

exports.findYelpCompetitors = findYelpCompetitors;
function findYelpCompetitors(company, radius, cb) {
    //just going to use zip code to find 5 nearby competitors.
    //https://www.yelp.com/search?find_desc=&find_loc=46845&ns=1
    var tagAddress = company.streetAddress.replace(/ /g, "+");
    var tagCity = company.city.replace(/ /g, "+");
    var tagState = company.state.replace(/ /g, "+");

    var url = "https://www.yelp.com/search?find_desc=&find_loc=";
    url += "" + tagAddress + "+" + tagCity + "+" + tagState + "+" + company.zipcode;
    url += "&radius=" + radius;
    console.log("" + url);
    //console.log("competitor search address " + url);
    //url += "&ns=1";
    var companies = [];
    request(url, function (error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        //console.log("sup bitch");
        if (!error) {
            var i = 1;
            //html.replace(/<br\s?\/?>/gi, " ");
            var $ = cheerio.load(html);

                while (i < 6) {
                    var company = new Object();
                    //console.log("please help");
                    //As of 9/29/17 to identify yelps first search result that is not an ad is...
                    //The first list entry with this class <li class="regular-search-result">
                    //Then it is the anchor tag with the class <biz-name> and we need the href
                    company.companyURL = "https://www.yelp.com"
                    company.companyURL += $('span.indexed-biz-name a').eq(i).attr('href');
                    //company.companyURL += $('li.regular-search-result a').eq(i).attr('href');
                    console.log("" + company.companyURL);

                    company.name = $('span.indexed-biz-name a').eq(i).text();
                    //i++;
                    //now to change the <br> to a space so the street addr and city
                    //aren't right next to each other
                    $('div.secondary-attributes').find('br').replaceWith(", ");
                    //company.companyName = $('span.indexed-biz-name a').eq(i).text();
		            company.streetAddress = $('div.secondary-attributes').eq(i).text();

                    //company.streetAddress = $('div.secondary-attributes').eq(i).text();
                    var endOfAddress = String(company.streetAddress).indexOf("Phone number");
                    // had to get rid of leading thing which was a neighborhood option
                    company.streetAddress = String(company.streetAddress).substring(0, endOfAddress).trim();
                    var endNeighbor = String(company.streetAddress).lastIndexOf('\n');
                    //console.log("last tab at: " + endNeighbor);

                    company.streetAddress = String(company.streetAddress).substring(endNeighbor);
                    company.streetAddress = String(company.streetAddress).trim();
                    //company.companyName = $('span.indexed-biz-name a').eq(i).text();


                    //company.companyName = $('span.indexed-biz-name a').eq(i).text();
                    
                    i++;
                    //console.log("i: " + i);

                    console.log("company name: " + company.name);

                    //split adddress into different fields.
                    var finAddress = String(company.streetAddress).split(", ");
                    company.streetAddress = finAddress[0];
                    company.city = finAddress[1];
                    var stateZip = String(finAddress[2]).split(" ");
                    company.state = stateZip[0];
                    company.zipcode = stateZip[1];
                    // console.log("company street address: " + company.streetAddress);
                    // console.log("company street address: " + company.city);
                    // console.log("company street address: " + company.state);
                    // console.log("company street address: " + company.zipcode);
                    companies.push(company);
                    //companies[i] = company;
                }
          } else {
                //cb("ERROR");
                console.log("ERROR");
          }
        //console.log("what the fuck");
        //console.log("company: " + companies[0].name);

        cb(companies);
        //return companies;

    });
    //console.log("there is no god");


}

