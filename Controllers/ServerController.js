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
var Stat = require("../Models/Stat.js");
var Competitors = require("../Models/Competitors.js");

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
                    console.log(company.sendEmails);
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
        //Get Company through cookie and return their reviews object
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
                    var option = "5";
                    Stat.sortReviews(company.reviews, option, function() {
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
                        //Update database with new reviews
                        Database.updateCompany(company, function(){
<<<<<<< HEAD
                          //Render analytics page with new reviews
                          response.render("analytics", {company:company, reviews:company.reviews});
=======
                                        //Render analytics page with new reviews
                                        
                                        response.render("analytics", {company:company, reviews:company.reviews});
                                        
>>>>>>> master
                        });
                        var subject = "We have run new Analytics on your company!";
                        var message = "Hello " + company.name + ",\nnew analytics have been made!";
                        if(company.sendEmails === "on") {
                            
                            Email.sendEmail(company.email, subject, message);
                        }

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

    app.post("/passwordSettings", function(request, response) {
        console.log("Request to change password");
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
                            response.redirect("settings");
                        }else {
                            Database.encryptPassword(newPassword, function(encryptedPassword){
                                company.password = encryptedPassword;
                                Database.updateCompany(company, function() {
                                    response.redirect("settings");
                                });
                            });
                        }
                    });
                }
            })
        };
    });

    app.post("/emailPreferenceSettings", function(request, response) {
        console.log("Request to change email settings");
        //Update company settings
        var token = request.cookies.token;
        if(token === undefined) {
            //Welcome screen
            response.redirect("welcome");
        } else {
            //Use token to get company information
            Database.getCompany(token, function(company) {
                if(company === undefined) {
                    //Token wasn't valid so delete token
                    response.clearCookie("token");
                    response.redirect("welcome");
                }else {
                    company.sendEmails = request.body.sendEmails;

                    console.log(company.sendEmails);
                    Database.updateCompany(company, function(){
                        response.redirect("settings");
                    });
                }
            })
        };
    });

    app.post("/emailSettings", function(request, response) {
        console.log("Request to change email settings");
        //Update company settings
        var token = request.cookies.token;
        if(token === undefined) {
            //Welcome screen
            response.redirect("welcome");
        } else {
            //Use token to get company information
            Database.getCompany(token, function(company) {
                if(company === undefined) {
                    //Token wasn't valid so delete token
                    response.clearCookie("token");
                    response.redirect("welcome");
                }else {
                    company.email = request.body.email;

                    console.log(company.sendEmails);
                    Database.updateCompany(company, function(){
                        response.redirect("settings");
                    });
                }
            })
        };
    });

    app.post("/emailSettings", function(request, response) {
        console.log("Request to change email settings");
        //Update company settings
        var token = request.cookies.token;
        if(token === undefined) {
            //Welcome screen
            response.redirect("welcome");
        } else {
            //Use token to get company information
            Database.getCompany(token, function(company) {
                if(company === undefined) {
                    //Token wasn't valid so delete token
                    response.clearCookie("token");
                    response.redirect("welcome");
                } else {
                    company.sendEmails = request.body.sendEmails;
                    Database.updateCompany(company, function(){
                        response.redirect("settings");
                    });
                }
            })
        };
    });

    app.post("/usernameSettings", function(request, response) {
        console.log("Request to change email settings");
        //Update company settings
        var token = request.cookies.token;
        if(token === undefined) {
            //Welcome screen
            response.redirect("welcome");
        } else {
            //Use token to get company information
            Database.getCompany(token, function(company) {
                if(company === undefined) {
                    //Token wasn't valid so delete token
                    response.clearCookie("token");
                    response.redirect("welcome");
                }else {
                    company.username = request.body.username;
                    Database.updateCompany(company, function(){
                        response.redirect("settings");
                    });
                }
            })
        };
    });

    app.post("/feedback", function(request, response) {
        var subject = "User feedback from " + request.body.firstName + " " + request.body.lastName + " ";
        subject += "about " + request.body.subject;
        var message = request.body.message;
        message += "\n\nThe user can be reached at: " + request.body.email;
        Email.sendEmail("fulqrumpurdue@gmail.com", subject, message);
        response.redirect("contact");
    });

    app.get("/contact", function(request, response) {
        response.render("contact", {error : undefined});
    });

    app.get("*", function(request, response){
        //All requests that don't match one of the above
        response.render("noSuchPage");
    });

    //competitors GET request - Map View of local competitors
    app.get("/competitors", function(request, response){
        //Get analytics of competitor companies
        //Get analytics for the user with specific ID
        //Get Company through cookie and return their reviews object
        var token = request.cookies.token;
        if(token === undefined) {
            //Welcome screen
            response.render("welcome");
        } else {
            //With the token, you use the database to get the company

            Database.getCompany(token, function(company) {
                if(company === undefined) {
                    //Token wasn't valid so delete token
                    response.clearCookie("token");
                    response.redirect("/");
                }else {


                    var competitors = WebScraper.findYelpCompetitors();

                    var option = "5";
                    Stat.sortReviews(company.reviews, option, function() {
                        response.render("analytics", {company : company, reviews:company.reviews});
                    });
                }
            })
        };
    });

    //competitors POST
    app.post("/competitors", function(request, response) {
        var token = request.cookies.token;
        if(token === undefined) {
            //Welcome screen
            response.render("welcome");
        } else {
            Database.getCompany(token, function(company) {
                if(company === undefined) {
                    //Token wasn't valid so delete token
                    response.clearCookie("token");
                    response.render("welcome");
                }else {
                  Database.getCompany(token, function(company) {
                      if (company === undefined || company === null) {
                          response.clearCookie("token");
                          response.render("welcome");
                      }
                      else {
                          var rad;
                          switch(request.body.Radius) {
                              case "1":
                                  rad = 8047;
                                  break;
                              case "2":
                                  rad = 16093;
                                  break;
                              case "3":
                                  rad = 24140;
                                  break;
                              case "4":
                                  rad = 32187;
                                  break;
                              case "5":
                                  rad = 40000;
                                  break;
                              default:
                                  rad = 15000;

                          }
                          var competitors = [];
                          competitors = WebScraper.findYelpCompetitors(competitors, rad);
                          company.competitors = companies;
                          console.log("Company name: " + companies[0]);

                          Database.updateCompany(company, function() {
                          });
                          //time 2 analytics the competitors
                          var i = 0;
                          for (i; i < 5; i++) {
                              var hasReviews = false;
                              console.log("Company name: " + company.competitors[i].name);
                              WebScraper.scrape(company.competitors[i], hasReviews, function (reviews) {
                                  company.competitors[i].reviews = reviews;
                                  Database.updateCompany(company.competitors[i], function () {
                                      response.render("analytics", {company: company.competitors[i], reviews: company.competitors[i].reviews});
                                  });
                              });
                          }

                          Competitors.initMap(company.streetAddress, competitors);
                          response.render("competitors");
                        //END else statement
                      }
                      //END Database.getCompany
                  })
                }
            })
        };
    });
    //END of module.exports()
  }
