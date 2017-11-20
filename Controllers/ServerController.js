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
var Email = require("../Models/Email.js");
module.exports = function (app) {
    /*var company = new Object();
    company.name = "KFC";
    company.city = "Downers Grove";
    WebScraper.freshScrape(company, function() {
        console.log("Hello");
    });*/
    
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
                if(company === undefined || company === null) {
                    //Token wasn't valid so delete token
                    response.clearCookie("token");
                    response.render("welcome");
                }else {
                    response.render("homepage", {company : company});
                }
            })
        };
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
        ServerParser.createCompany(request.body, function(company) {
            //Attempt to put company into database
            Database.registerCompany(company, function(error){
                if(!error) {
                    var subject = "Account Registered!";
                    var message = "Hello " + company.name + ",\nYour account has been created";
                    Email.sendEmail(company.email, subject, message);
                    response.redirect("/");
                }else {
                    //Error occured
                    response.render("register", {error : error});
                }
            });
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
                response.redirect("/");
            }
        });

    });

    app.get("/logout", function(request, response) {
        response.clearCookie("token");
        response.redirect("/");
    });

    app.get("/analytics", function(request, response){
        //Get analytics for the user with specific ID
        //Get Company through cookie and return there reviews object
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
                    response.redirect("/");
                }else {
                    //0 = default(order scraped), 1 = alphabetical, 2 = by rating low
                    //3 = by rating high
                    var option = "3";
                    ServerParser.sortReviews(company.reviews, option, function() {
                        response.render("analytics", {company : company, reviews:company.reviews});                        
                    });
                }
            })
        };
    });
    app.post("/analytics", function(request, response) {
        //Update analytics
        //Get analytics
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
                    var hasReviews = false;
                    WebScraper.scrape(company, hasReviews, function(reviews) {
                        company.reviews = reviews;
                        console.log("Chicken");
                        //response.render("analytics",{company:company});
                        //Update database with new reviews
                        Database.updateCompany(company, function(){
                                        console.log("MADE IT");
                                        //Render analytics page with new reviews
                                        response.render("analytics", {company:company, reviews:company.reviews});
                                        //response.render("welcome");
                                        
                        });

                    });
                }
            })
        };


    });

    app.get("/settings", function(request, response){
        //Get company settings
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
                    response.render("settings", {company : company});
                }
            })
        };
    });

    app.post("/settings", function(request, response) {
        //Update company settings
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
                    ServerParser.verifyNewPassword(request.body, function(newPassword){
                        if(newPassword === undefined || newPassword === null) {
                            response.render("settings");
                        }else {
                            Database.encryptPassword(newPassword, function(encryptedPassword){
                                company.password = encryptedPassword;
                                Database.updateCompany(company);
                                response.render("settings");
                            });
                        }
                    });
                }
            })
        };
    });

    app.post("/email", function(request, response) {
        //Update company settings
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
                    company.email = request.body.email;
                    Database.updateCompany(company);
                    response.render("settings");
                }
            })
        };
    });

    app.get("/contact", function(request, response) {
        response.render("contact", {error : undefined});
    });

    app.get("*", function(request, response){
        //All requests that don't match one of the above
        response.render("noSuchPage");
    });
}
