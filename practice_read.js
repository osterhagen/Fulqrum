#! /usr/bin/env node

var fs = require("fs");
console.log("\n Starting... \n");

// Get content from file
var contents = fs.readFileSync("exampleReview.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
// Get Value from JSON
console.log("Origin:", jsonContent.origin);
console.log("name_of_reviewer:", jsonContent.name_of_reviewer);
console.log("date_of_review:", jsonContent.date_of_review);
console.log("review:", jsonContent.review)
console.log("rating", jsonContent.rating)
console.log("useful", jsonContent.useful)
console.log("\n *EXIT* \n");
