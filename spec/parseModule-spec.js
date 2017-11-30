var WebScraper = require("../Models/WebScraper.js");

describe("Find company on yelp: ", function() {
    it("Find Phiz Coffee", function() {
        var company = {
            name: "Philz Coffee",
            city: "San Francisco",
            zipcode: "94080"
        }

        WebScraper.findYelpCompanyPage(company, function(error, data) {
            expect(data).toBe("https://www.yelp.com/biz/philz-coffee-san-francisco-2?osq=Philz+Coffee");
        });
    });

    it("Find Starbucks ", function() {
        var company = {
            name: "Starbucks",
            city: "San Francisco",
            zipcode: "94080"
        }
        WebScraper.findYelpCompanyPage(company, function(error, data) {
            expect(data).toBe("https://www.yelp.com/biz/starbucks-san-francisco-52?osq=starbucks");
        });
    })
});
/*
describe("Find competitors on yelp: ", function() {
    it("Ensure 5 competitors found: ", function() {
        var company = {
            name: "Philz Coffee",
            city: "San Francisco",
            zipcode: "94080"
        }

        var companies = WebScraper.findYelpCompetitors(company.zipcode, function(error, data) {
            expect(companies.length).toBe(5);
        });
    });
});
*/