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

    Database.encryptPassword(json.password, function(encryptedPwd) {
        company.password = encryptedPwd;
        cb(company);
    });
}
