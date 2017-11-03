/*
 * This handles basic control and flow of
 * server logic.  All communication between
 * server and client occur here.
 */

var WebScraper = require("../Models/WebScraper.js");
var ServerParser = require("../Models/ServerParser.js");
var ServerErrorHandler = require("../Models/ServerErrorHandler.js");
var Database = require("../Models/Database.js");
var Analysis = require("../Models/analysis_module/analysis.js");


module.exports = function (app) {
    var company = {
        name: "clementine",
        streetAddress: "123 Street",
        city: "San Francisco",
        zipcode: "94080",
        password: "123"
    }
    //Database.registerCompany(company);
    //Database.listCompanies();
    //Database.clearDatabase();
    app.get("/", function(request, response) {
        //Check if user is logged in if so send to homepage
        //Else send to welcome screen
        var token = request.cookies.token;
        if(token === undefined) {
            //Welcome screen
            response.render("welcome");
        } else {
            //Use token to get company information
            Database.getCompany(token, function(company) {
                if(company === undefined) {
                    //Token wasn't valid so delete token
                    response.clearCookie("token");
                    response.render("welcome");
                }else {
                    response.render("homepage", {company : company});
                }
            })
        };
    });

    app.get("/analytics", function(request, response){
        response.render("analytics", {error : undefined})
    });

    app.get("/settings", function(requrest, response){
      response.render("settings", {error : undefined})
    });

    app.get("/register", function(request, response){
        //New user register screen
        response.render("register", {error : undefined})
        //response.render("homepage");
    });

    app.post("/register", function(request, response){
        //Add the user to the database if they do not exist
        var company = ServerParser.createCompany(request.body);
        console.log("Server Sent Company:\n" + company + "\n");
        //Attempt to put company into database
        Database.registerCompany(company, function(error){
            if(!error) {
                response.render("welcome");
            }else {
                //Error occured
                response.render("register", {error : error});
            }
        });

    });

    app.get("/login", function(request, response){
        //Log in screen
        response.render("login", {error : undefined});
    });

    app.post("/login", function(request, response){
        //Login user
        Database.login(request.body.username, request.body.password, function(company) {
            if(company == null) {
                response.render("login", {error : "Invalid Login Credentials"});
            }else {
                //If successful user should now have login token
                response.cookie("token", company.token);
                response.render("homepage", {company : company});
            }
        });

    });

    app.put("/logout", function(request, response) {
        response.clearCookie("token");
        response.render("welcome");
    });

    app.get("/analytics", function(request, response){
        //Get analytics for the user with specific ID
        //Get Company through cookie and return there reviews object

    });
    app.put("/analytics", function(request, resposne) {
        //Update analytics
        //Get analytics
        //TODO Check if company has any reviews
        var company;
        var hasReviews = false;

        WebScraper.scrape(company, hasReviews, function(reviews) {
            company.reviews = reviews;
            //Update database with new reviews
            Database.updateCompany(company, function(){
                            //Render analytics page with new reviews
            });

        });
    });

    app.get("/settings", function(request, response){
        //Get company settings

    });

    app.put("/setting", function(request, response) {
        //Update company settings
    });


    app.get("*", function(request, response){
        //All requests that don't match one of the above
        response.render("noSuchPage");
    });
}
