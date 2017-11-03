/*
 * This will parse information
 * received from the client
 * and make it useable for
 * the server
 */
var Database = require("./Database.js");
var randToken = require("rand-token");




exports.createCompany = createCompany;
function createCompany(json,cb) {
    var company = new Object();
    company.name = json.name;
    company.username = json.username;
    company.email = json.email;
    company.phoneNumber = json.phone;
    company.streetAddress = json.streetAddress;
    company.city = json.city;
    company.state = json.state;
    company.zipcode = json.zipcode;
    company.token = randToken.generate(16);
    company.sendEmails = json.sendEmails;
    if(json.Industry === "1") {
      company.industry = "Restaurant";
    } else if (json.Industry === "2") {
      company.industry = "Auto Repair";
    } else if (json.Industry === "3") {
      company.industry = "Nightlife";
    } else if (json.Industry === "4") {
      company.industry = "Retail";
    } else if (json.Industry === "5") {
      company.industry = "Fitness";
    }
    company.reviews = {};

    Database.encryptPassword(json.password, function(encryptedPwd) {
        company.password = encryptedPwd;
        cb(company);
    });
}

exports.verifyNewPassword = verifyNewPassword;
function verifyNewPassword(json, cb) {
  if(json.password === json.password_confirmation){
    cb(json.password);
  }else {
    cb(null);
  }
}

exports.sortReviews = sortReviews;
function sortReviews(reviews, option, cb) {
  if(reviews === undefined || reviews === null) {
    cb();
  }
    if(option==="1") {
      sortAlphabetically(reviews, cb);
    }else if(option === "2") {
      sortByRatingLow(reviews, cb);
    }else if(option === "3") {
      sortByRatingHigh(reviews, cb);
    }
}

function sortAlphabetically(reviews, cb) {
  //Bubble sort by alphabetical naming
   for(var i = 0; i < reviews.length; i++) {
      for(var j = 0; j < reviews.length-1; j++) {
        if(reviews[j].name_of_reviewer > reviews[j+1].name_of_reviewer) {
          //swap 
          var temp = reviews[j];
           reviews[j] = reviews[j+1];
           reviews[j+1] = temp;
        }
      }
   }
   cb();
}

function sortByRatingLow(reviews,cb) {
  //Bubble sort by alphabetical naming
  for(var i = 0; i < reviews.length; i++) {
    for(var j = 0; j < reviews.length-1; j++) {
      if(parseFloat(reviews[j].rating) > parseFloat(reviews[j+1].rating)) {
        //swap 
        var temp = reviews[j];
         reviews[j] = reviews[j+1];
         reviews[j+1] = temp;
      }
    }
 }
 cb();
}

function sortByRatingHigh(reviews,cb) {
  //Bubble sort by alphabetical naming
  for(var i = 0; i < reviews.length; i++) {
    for(var j = 0; j < reviews.length-1; j++) {
      if(parseFloat(reviews[j].rating) < parseFloat(reviews[j+1].rating)) {
        //swap 
        var temp = reviews[j];
         reviews[j] = reviews[j+1];
         reviews[j+1] = temp;
      }
    }
 }
 cb();
}
