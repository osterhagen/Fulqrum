/*
 * This will parse information
 * received from the client
 * and make it useable for
 * the server
 */ 

exports.createCompany = createCompany;
function createCompany(json) {
    var company = new Object();
    company.name = json.name;
    company.username = json.username;
    company.email = json.email;
    company.phoneNumber = json.phoneNumber;
    company.password = json.password;
    company.streetAddress = json.streetAddress;
    company.city = json.city;
    company.state = json.state;
    company.zipcode = json.zipcode;
    return company;
}