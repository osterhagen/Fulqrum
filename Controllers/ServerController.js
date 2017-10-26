var WebScraper = require("../Models/WebScraper.js");
var ServerParser = require("../Models/ServerParser.js");
var ServerErrorHandler = require("../Models/ServerErrorHandler.js");
var Database = require("../Models/Database.js")


module.exports = function (app) {
    app.get("/", function(request, response) {
        //Welcome screen
        response.render("welcome");
    });

    app.get("/homepage/:id", function(request, response){
        //Home page when logged in
        response.render("homepage");

    });

    app.get("/register", function(request, response){
        //New user register screen
        response.render("register", {error : undefined})
        //response.render("homepage");
    });

    app.post("/register", function(request, response){
        //Add the user to the database if they do not exist
        var company = ServerParser.createCompany(request.body);
       
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

        }catch(error) {
            var message = ServerErrorHandler.convertErrorToMessage(error);
            response.render("login", {error : message});
        }
    });

    app.get("/analytics/:id", function(request, response){
        //Get analytics for the user with specific ID

    });


    app.get("*", function(request, response){
        //All requests that don't match one of the above
        response.render("noSuchPage");
    });
}
