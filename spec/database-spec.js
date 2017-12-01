var Database = require("../Models/Database.js");

describe("Register Company: ", function() {
    it("Register Company 1", function() {
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

describe("Login Company: ", function() {
    it("Login Company 1", function() {
        var company = {
            name: "Company 1",
            streetAddress: "123 Street",
            city: "San Francisco",
            zipcode: "94080",
            username: "Chicken",
            password: "123"
        }

        Database.registerCompany(company, function(error) {
            Database.login(company.username, company.password, function(result) {
                //console.log(result);
                expect(result.username).toBe(password.username);
            });
        });
        
        
    });
    it("Login Nonexistent company", function() {
        //Database.clearDatabase();        
        var username = "zzz";
        var password = "4545";
        Database.login(username, password, function(result) {
            //console.log(result);
            expect(result).toBe(null);
        });
        
        
        
    });
    
    

    
});
describe("Email and feedback tests ", function() {
    fit("Database stores email enable settings", function() {
        Database.listCompanies();
    });
});
