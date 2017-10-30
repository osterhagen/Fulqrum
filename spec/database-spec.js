var Database = require("../Models/Database.js");

describe("Register Company: ", function() {
    fit("Register Company 1", function() {
        Database.clearDatabase();        
        var company = {
            name: "Company 1",
            streetAddress: "123 Street",
            city: "San Francisco",
            zipcode: "94080"
        }
        var hasError = false;
        try{
            Database.registerCompany(company);
        }catch (error) {
            if(error) {
                console.log(error);
                hasError = true;
            }
        }
        expect(hasError).toBe(false);
        
    });

    
});
