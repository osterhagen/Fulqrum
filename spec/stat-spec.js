var Stat = require("../Models/Stat.js");
var reviewsSet1 = [
    {
        "review" : "Review A",
        "rating" : "5", 
        "entities" : [
            {
                "Name" : "apple",
                "Type" : "",
                "Score" : "",
                "Magnitude" : ""
            }
        ]
    },
    {
        "review" : "Review B",
        "rating" : "4", 
        "entities" : [
            {
                "Name" : "apple",
                "Type" : "",
                "Score" : "",
                "Magnitude" : ""
            }
        ]
    },
    {
        "review" : "Review C",
        "rating" : "3", 
        "entities" : [
            {
                "Name" : "apple",
                "Type" : "",
                "Score" : "",
                "Magnitude" : ""
            }
        ]
    },
    {
        "review" : "Review D",
        "rating" : "2", 
        "entities" : [
            {
                "Name" : "apple",
                "Type" : "",
                "Score" : "",
                "Magnitude" : ""
            }
        ]
    },
    {
        "review" : "Review E",
        "rating" : "1", 
        "entities" : [
            {
                "Name" : "apple",
                "Type" : "",
                "Score" : "",
                "Magnitude" : ""
            }
        ]
    }
    
];
var reviewsSet2 = [];

describe("Check Stat Functions ", function() {
    it("Get average review score", function() {
        Stat.getAverage(reviewsSet1, function(average) {
            var worked = false;
            if(average === 3) {
                worked = true;
            }
            expect(worked).toBe(true);
        });
    });

    it("Get average review score with no reviews", function() {
        Stat.getAverage(reviewsSet2, function(average) {
            var worked = false;
            if(average === 0) {
                worked = true;
            }
            expect(worked).toBe(true);
        });
    });

});
describe("Check Sort Functions ", function() {

    it("Get Best review score", function() {
        Stat.getBestReviewsByRating(reviewsSet1, 1, function(reviews) {
            var worked = false;
            if(reviews.length === 1 && reviews[0].rating === "5") {
                worked = true;
            }
            expect(worked).toBe(true);
        });
    });

    it("Get Worst review score", function() {
        Stat.getWorstReviewsByRating(reviewsSet1, 1, function(reviews) {
            var worked = false;
            if(reviews.length === 1 && reviews[0].rating === "1") {
                worked = true;
            }
            expect(worked).toBe(true);
        });
    });

    it("Get 3 Best review scores", function() {
        Stat.getBestReviewsByRating(reviewsSet1, 3, function(reviews) {
            console.log(reviews);
            var worked = false;
            if(reviews.length === 3 && reviews[0].rating === "5" && reviews[1].rating === "4"
                && reviews[2].rating === "3") {
                worked = true;
            }
            expect(worked).toBe(true);
        });
    });

    it("Get 3 Worst review scores", function() {
        Stat.getWorstReviewsByRating(reviewsSet1, 3, function(reviews) {
            console.log(reviews);
            var worked = false;
            if(reviews.length === 3 && reviews[0].rating === "1" && reviews[1].rating === "2"
                && reviews[2].rating === "3") {
                worked = true;
            }
            expect(worked).toBe(true);
        });
    });

    it("Get Best review scores when number is larger than number of reviews", function() {
        Stat.getBestReviewsByRating(reviewsSet1, 100, function(reviews) {
            console.log(reviews);
            var worked = false;
            if(reviews.length === 5) {
                worked = true;
            }
            expect(worked).toBe(true);
        });
    });

    it("Get Reviews Before Date", function() {
        
    });

    it("Get Reviews After Date", function() {
        
    });

    it("Get Reviews Between Dates", function() {
        
    });

});