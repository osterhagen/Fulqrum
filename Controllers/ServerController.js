/*
 * This handles basic control and flow of 
 * server logic.  All communication between
 * server and client occur here.
 */ 

var WebScraper = require("../Models/WebScraper.js");
var ServerParser = require("../Models/ServerParser.js");
var ServerErrorHandler = require("../Models/ServerErrorHandler.js");
var Database = require("../Models/Database.js")


module.exports = function (app) {
    var company = {
        name: "clementine",
        streetAddress: "123 Street",
        city: "San Francisco",
        zipcode: "94080",
        password: "123"
    }
    /*try {
          Database.registerCompany(company);
    }catch (error) {
        console.log(error);
    }*/
    //Database.registerCompany(company);
    //Database.listCompanies();
    //Database.clearDatabase();
    app.get("/", function(request, response) {
        //Check if user is logged in if so send to homepage
        //Else send to welcome screen
        if(request.cookies != undefined) {
            var token = request.cookies["token"];
        }
        if(token === undefined) {
            //Welcome screen
            response.render("welcome");
        } else {
            //Use token to get company information
            Database.getCompany(token, function(company) {
                if(company === undefined) {
                    //Token wasn't valid so delete token
                    res.clearCookie("token");                   
                    response.render("welcome");
                }else {
                    response.render("homepage", {company : company});
                }
            })
        };
    });

    app.get("/register", function(request, response){
        //New user register screen
        response.render("register", {error : undefined})
        //response.render("homepage");
    });

    app.post("/register", function(request, response){
        //Add the user to the database if they do not exist
        var company = ServerParser.createCompany(request.body);
       console.log(company);
        try {
            //Attempt to put company into database
            Database.registerCompany(company, function(){
                //Success
                response.render("welcome");                
            });
        }catch(error) {
            var message = ServerErrorHandler.convertErrorToMessage(error);

            response.render("register", {error : message});
        }
        
    });

    app.get("/login", function(request, response){
        //Log in screen
        response.render("login", {error : undefined});
    });

    app.post("/login", function(request, response){
        //Login user
        try{
            //Login
            
            Database.login(request.body.username, request.body.password, function(company) {
                //If successful user should now have login token
                response.render("homepage", {company : company});
            });

        }catch(error) {
            var message = ServerErrorHandler.convertErrorToMessage(error);
            response.render("login", {error : message});
        }
    });

    app.put("/logout", function(request, response) {
        var token = req.cookies["token"];
        if(token === undefined) {
            //Welcome screen
            response.render("welcome");
        } else {
            Database.removeLoggedInCompany(token);
            res.clearCookie("token");                               
            response.render("welcome");
        }
    });

    app.get("/analytics/:id", function(request, response){
        //Get analytics for the user with specific ID

    });

    app.get("/settings/:id", function(request, response){
        //Get company settings

    });

    app.put("/setting/:id", function(request, response) {
        //Update company settings
    });


    app.get("*", function(request, response){
        //All requests that don't match one of the above
        response.render("noSuchPage");
    });
}
