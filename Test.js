var Email = require("./Models/Email.js");

var company = {
    email: "connorborz@gmail.com",
    name: "Connor's Cookies"
};
var subject = "Account Registered!";
var message = "Hello" + company.name + ",\nYour account has been created";
Email.sendEmail(company.email, subject, message);