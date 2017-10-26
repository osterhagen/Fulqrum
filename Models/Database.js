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