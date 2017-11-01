var Database = require("../Models/Database.js");

describe("Register Company: ", function() {
    it("Register Company 1", function() {
        Database.clearDatabase();        
        var company = {
            name: "Company 1",
            streetAddress: "123 Street",
            city: "San Francisco",
            zipcode: "94080"
        }
        Database.registerCompany(company, function(error) {
            expect(error).toBe(false);
        })
        
        
    });
    it("Register multiple companies", function() {
        Database.clearDatabase();        
        var company = {
            name: "Company 1",
            streetAddress: "123 Street",
            city: "San Francisco",
            zipcode: "94080"
        }
        var company2 = {
            name: "Company 2",
            streetAddress: "Apple Street",
            city: "San Francisco",
            zipcode: "94080"
        }
        Database.registerCompany(company, function(error) {
            Database.registerCompany(company2, function(error){
                    expect(error).toBe(false);
            });
        });
        
        
    });
    it("Register already existing company", function() {
        Database.clearDatabase();
        var company = {
            name: "Company 1",
            streetAddress: "123 Street",
            city: "San Francisco",
            zipcode: "94080"
        }
        Database.registerCompany(company, function(error) {
            Database.registerCompany(company, function(error) {
                    expect(error).toBe("CompanyAlreadyExists");
            });
        });
    });
    

    
});
