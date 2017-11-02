/*
 * This will parse information
 * received from the client
 * and make it useable for
 * the server
 */
function encryptPassword(password) {
    // a basic caesar cypher
    //return password.replace(/[A-Z]/g, L => String.fromCharCode((L.charCodeAt(0) % 26) + 65));
    var out = "";
    for (var i = 0; i < password.length; i++) {
        out += String.fromCharCode(password[i].charCodeAt(0)+3);

    }
    return(out);
}



exports.createCompany = createCompany;
function createCompany(json) {
    var company = new Object();
    company.name = json.name;
    company.username = json.username;
    company.email = json.email;
    company.phoneNumber = json.phone;
    company.password = json.password;
    company.cpassword = json.cPassword;
    company.streetAddress = json.streetAddress;
    company.city = json.city;
    company.state = json.state;
    company.zipcode = json.zipcode;
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

    return company;
}
