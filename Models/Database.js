/*
 * This take's care of database logic 
 * such as verification of inputs
 * retrieving info from database
 * and updating info to database
 * 
 */ 


var randtoken = require('rand-token');
//Keeps track of cookies of companies that are logged in
var loggedInCompanies = [];

exports.registerCompany = registerCompany;
function registerCompany(company, cb) {
    //Verify credentials
    //Check for blank fields
    for(var i = 0; i < Object.keys(company).length; i++) {
        if(company[i]===undefined || company[i] === "") {
            throw "BlankFieldsError";
        }
    }

    //See if company is already in database


    //Credentials verified add to database
    cb();
}

exports.login = login;
function login(username, password, cb) {
    //Verify credentials
    if(username === undefined || password === undefined || username === "" || password === "") {
        throw "BlankFieldsError";
    }
    var company;
    //Valid  info get the company from database

    //Generate token to keep user logged in
    var token = randtoken.generate(16);
    var loggedInCompany = new Object();
    loggedInCompany.token = token;
    loggedInCompany.company = company;
    loggedInCompanies.put(loggedInCompany);
    cb(company, token);    
}