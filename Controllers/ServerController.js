var WebScraper = require("../Models/ParseModule/WebScraper.js");
var bodyParser = require('body-parser');


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
        response.render("register")
    });

    app.post("/register", function(request, response){
        //Add the user to the database if they do not exist

    });

    app.get("/login", function(request, response){
        //Log in screen
        response.render("login");
    });

    app.post("/login", function(request, response){
        //Login user

    });

    app.get("/analytics/:id", function(request, response){
        //Get analytics for the user

    });


    app.get("*", function(request, response){
        //All requests that don't match one of the above
        response.render("noSuchPage");
    });
}
