
exports.getBestKeyword = getBestKeyword;
function getBestKeyword(reviews, num, cb) {
    var map = {};
    for(var i = 0; i < reviews.length; i++) {
        for(var j = 0; j < reviews[i].entities.length; j++) {
            if(map[JSON.stringify(reviews[i].entities[j])] === undefined || map[JSON.stringify(reviews[i].entities[j])]) {
                map[JSON.stringify(reviews[i].entities[j])] = 0;
            }else {
                map[JSON.stringify(reviews[i].entities[j])] = map[JSON.stringify(reviews[i].entities[j])] + 1;
            }
        }
    }

    //Now get the num greatest entities
    var entities = [];
    var i = 0;
    var cutoff = 0;
    for (var key in map) {
        if(i >= num ) {
            break;
        }
        if (map.hasOwnProperty(key)) {
            entities.push(JSON.parse(key));
            i++;
        }
    }


    for(var key in map) {
        if(map.hasOwnProperty(key)) {
            //If the rating is better replace
            if(map[key] > cutoff) {
                //Found a better rating than the worst one in the array
                //Replace that review with this one
                for(var j = 0; j < entities.length; j++) {
                    if(map[JSON.stringify[entities[j]]] <= cutoff) {
                        //Repace with new rating
                        entities[j] = JSON.parse(key);
                        cutoff = map[key];
                        break;
                    }
                }
                //Calculate new lowest rating
                for(var j = 0; j < entities.length; j++) {
                    if(map[JSON.stringify[entities[j]]] <= cutoff) {
                        cutoff = map[JSON.stringify[entities[j]]];
                    }
                }
            }
        }
    }

    cb(entities);
    
}


exports.getAverage = averageReviewScore;
function averageReviewScore(reviews, cb) {
    if(reviews.length === 0) {
        cb(0);
        return;
    }
    var totalScore = 0;
    for(var i = 0; i < reviews.length; i++) {
        totalScore += parseFloat(reviews[i].rating);
    }
    var averageScore = totalScore / reviews.length;

    cb(averageScore);
}

exports.getReviewsWithKeyword = getReviewsWithKeyword;
function getReviewsWithKeyword(reviews, keyword, cb) {
    if(reviews.length === 0) {
        cb(0);
        return;
    }
    var reviewsWithKeyword = [];
    for(var i = 0 ; i < reviews.length; i++) {
        if(reviews[i].review.contains(keyword)) {
            reviewsWithKeyword.push(reviews[i]);
        }
    }
    cb(reviewsWithKeyword);
}

exports.getBestReviewsByRating = getBestReviewsByRating;
function getBestReviewsByRating(reviews, number, cb) {
    var bestReviews = [];
    
    if(reviews.length === 0) {
        cb(bestReviews);
        return;
    }
    //fill default reviews 
    var i = 0;
    var lowestRating = 0;
    //fill in the first "number" of reviews
    while(i < reviews.length && i < number) {
        bestReviews.push(reviews[i]);
        if(parseFloat(reviews[i].rating) < lowestRating) {
            lowestRating = parseFloat(reviews[i].rating);
        }
        i++;
    }
    if(i === reviews.length) {
        //Requested all reviews
        cb(bestReviews);
        return;
    }
    
    for(var i = 0; i < reviews.length; i++) {
        //If the rating is better replace
        if(parseFloat(reviews[i].rating) > lowestRating) {
            //Found a better rating than the worst one in the array
            //Replace that review with this one
            for(var j = 0; j < bestReviews.length; j++) {
                if(parseFloat(bestReviews[j].rating) <= lowestRating) {
                    //Repace with new rating
                    bestReviews[j] = reviews[i];
                    lowestRating = parseFloat(bestReviews[j].rating);
                    break;
                }
            }
            //Calculate new lowest rating
            for(var j = 0; j < bestReviews.length; j++) {
                if(parseFloat(bestReviews[j].rating) <= lowestRating) {
                    lowestRating = parseFloat(bestReviews[j].rating);
                }
            }
        }
    }

    cb(bestReviews);
}

exports.getBestReviewsByAverageSentiment = getBestReviewsByAverageSentiment;
function getBestReviewsByAverageSentiment(reviews, number, cb) {
    var bestReviews = [];
    
    if(reviews.length === 0) {
        cb(bestReviews);
        return;
    }
    //fill default reviews 
    var i = 0;
    var lowestRating = 0;
    //fill in the first "number" of reviews
    while(i < reviews.length && i < number) {
        bestReviews.push(reviews[i]);
        if(parseFloat(reviews[i].averageSentiment) < lowestRating) {
            lowestRating = parseFloat(reviews[i].averageSentiment);
        }
        i++;
    }
    if(i === reviews.length) {
        //Requested all reviews
        cb(bestReviews);
        return;
    }
    
    for(var i = 0; i < reviews.length; i++) {
        //If the averageSentiment is better replace
        if(parseFloat(reviews[i].averageSentiment) > lowestRating) {
            //Found a better averageSentiment than the worst one in the array
            //Replace that review with this one
            for(var j = 0; j < bestReviews.length; j++) {
                if(parseFloat(bestReviews[j].averageSentiment) <= lowestRating) {
                    //Repace with new averageSentiment
                    bestReviews[j] = reviews[i];
                    lowestRating = parseFloat(bestReviews[j].averageSentiment);
                    break;
                }
            }
            //Calculate new lowest averageSentiment
            for(var j = 0; j < bestReviews.length; j++) {
                if(parseFloat(bestReviews[j].averageSentiment) <= lowestRating) {
                    lowestRating = parseFloat(bestReviews[j].averageSentiment);
                }
            }
        }
    }

    cb(bestReviews);
}

exports.getWorstReviewsByRating = getWorstReviewsByRating;
function getWorstReviewsByRating(reviews, number, cb) {
    var worstReviews = [];
    
    if(reviews.length === 0) {
        cb(worstReviews);
        return;
    }
    //fill default reviews 
    var i = 0;
    var highestRating = 0;
    //fill in the first "number" of reviews
    while(i < reviews.length && i < number) {
        worstReviews.push(reviews[i]);
        if(parseFloat(reviews[i].rating) >= highestRating) {
            highestRating = parseFloat(reviews[i].rating);
        }
        i++;
    }
    if(i === reviews.length) {
        //Requested all reviews
        cb(worstReviews);
        return;
    }
    
    for(var i = 0; i < reviews.length; i++) {
        if(parseFloat(reviews[i].rating) < highestRating) {
            //Found a better rating than the worst one in the array
            //Replace that review with this one
            for(var j = 0; j < worstReviews.length; j++) {
                if(parseFloat(worstReviews[j].rating) >= highestRating) {
                    //Repace with new rating
                    worstReviews[j] = reviews[i];
                    highestRating = parseFloat(worstReviews[j].rating);
                    break;
                }
            }
            //Calculate new lowest rating
            for(var j = 0; j < worstReviews.length; j++) {
                if(parseFloat(worstReviews[j].rating) >= highestRating) {
                    highestRating = parseFloat(worstReviews[j].rating);
                }
            }
        }
    }

    cb(worstReviews);
}

exports.getWorstReviewsByAverageSentiment = getWorstReviewsByAverageSentiment;
function getWorstReviewsByAverageSentiment(reviews, number, cb) {
    var worstReviews = [];
    
    if(reviews.length === 0) {
        cb(worstReviews);
        return;
    }
    //fill default reviews 
    var i = 0;
    var highestRating = 0;
    //fill in the first "number" of reviews
    while(i < reviews.length && i < number) {
        worstReviews.push(reviews[i]);
        if(parseFloat(reviews[i].averageSentiment) >= highestRating) {
            highestRating = parseFloat(reviews[i].averageSentiment);
        }
        i++;
    }
    if(i === reviews.length) {
        //Requested all reviews
        cb(worstReviews);
        return;
    }
    
    for(var i = 0; i < reviews.length; i++) {
        if(parseFloat(reviews[i].averageSentiment) < highestRating) {
            //Found a better averageSentiment than the worst one in the array
            //Replace that review with this one
            for(var j = 0; j < worstReviews.length; j++) {
                if(parseFloat(worstReviews[j].averageSentiment) >= highestRating) {
                    //Repace with new averageSentiment
                    worstReviews[j] = reviews[i];
                    highestRating = parseFloat(worstReviews[j].averageSentiment);
                    break;
                }
            }
            //Calculate new lowest averageSentiment
            for(var j = 0; j < worstReviews.length; j++) {
                if(parseFloat(worstReviews[j].averageSentiment) >= highestRating) {
                    highestRating = parseFloat(worstReviews[j].averageSentiment);
                }
            }
        }
    }

    cb(worstReviews);
}


exports.getReviewsBetweenDates = getReviewsBetweenDates;
//Expects format Date: "Month/Day/Year"
function getReviewsBetweenDates(reviews, startDate, endDate, cb) {
    var reviewsBetweenDates = [];

    if(reviews.length === 0) {
        cb(reviewsBetweenDates);
        return;
    }

    var startMonth = startDate.slice(0, startDate.indexOf("/"));
    var startDay = startDate.slice(startDate.indexOf("/")+1, startDate.lastIndexOf("/"));
    var startYear = startDate.slice(startDate.lastIndexOf("/")+1, startDate.length);

    startMonth = parseInt(startMonth);
    startDay = parseInt(startDay);
    startYear = parseInt(startYear);

    var endMonth = endDate.slice(0, endDate.indexOf("/"));
    var endDay = endDate.slice(endDate.indexOf("/")+1, endDate.lastIndexOf("/"));
    var endYear = endDate.slice(endDate.lastIndexOf("/")+1, endDate.length);

    endMonth = parseInt(endMonth);
    endDay = parseInt(endDay);
    endYear = parseInt(endYear);

    for(var j = 0; j < reviews.length; j++) {
        var month = reviews[j].date_of_review.slice(0, reviews[j].date_of_review.indexOf("/"));
        var day = reviews[j].date_of_review.slice(reviews[j].date_of_review.indexOf("/")+1, reviews[j].date_of_review.lastIndexOf("/"));
        var year = reviews[j].date_of_review.slice(reviews[j].date_of_review.lastIndexOf("/")+1, reviews[j].date_of_review.length);
        month = parseInt(month);
        day = parseInt(day);
        year = parseInt(year);
        var greaterThanStartYear = false;
        var lessThanEndYear = false;
        if(year > startYear) {
            greaterThanStartYear = true;
        }else if(year === startYear) {
            if(month > startMonth) {
                greaterThanStartYear = true;
            }else if(month === startMonth) {
                if(day >= startDay){
                    greaterThanStartYear = true;
                }
            }
        }
        if(year < endYear) {
            lessThanEndYear = true;
        }else if(year === endYear) {
            if(month < endMonth) {
                lessThanEndYear = true;
            }else if(month === endMonth) {
                if(day <= endDay){
                    lessThanEndYear = true;
                }
            }
        }

        if(lessThanEndYear && greaterThanStartYear) {
            reviewsBetweenDates.push(reviews[j]);
        }
    }
    cb(reviewsBetweenDates);
}























exports.sortReviews = sortReviews;
function sortReviews(reviews, option, cb) {
  if(reviews === undefined || reviews === null) {
    cb();
  }
    if(option==="1") {
      sortAlphabetically(reviews, cb);
    }else if(option === "2") {
      sortByRatingLow(reviews, cb);
    }else if(option === "3") {
      sortByRatingHigh(reviews, cb);
    }else if(option === "4") {
        sortByDateLow(reviews, cb);
    }else if(option === "5") {
        sortByDateHigh(reviews, cb);
    }

}

function sortAlphabetically(reviews, cb) {
  //Bubble sort by alphabetical naming
   for(var i = 0; i < reviews.length; i++) {
      for(var j = 0; j < reviews.length-1; j++) {
        if(reviews[j].name_of_reviewer > reviews[j+1].name_of_reviewer) {
          //swap 
          var temp = reviews[j];
           reviews[j] = reviews[j+1];
           reviews[j+1] = temp;
        }
      }
   }
   cb();
}

function sortByRatingLow(reviews,cb) {
  //Bubble sort by alphabetical naming
  for(var i = 0; i < reviews.length; i++) {
    for(var j = 0; j < reviews.length-1; j++) {
      if(parseFloat(reviews[j].rating) > parseFloat(reviews[j+1].rating)) {
        //swap 
        var temp = reviews[j];
         reviews[j] = reviews[j+1];
         reviews[j+1] = temp;
      }
    }
 }
 cb();
}

function sortByRatingHigh(reviews,cb) {
  //Bubble sort by alphabetical naming
  for(var i = 0; i < reviews.length; i++) {
    for(var j = 0; j < reviews.length-1; j++) {
      if(parseFloat(reviews[j].rating) < parseFloat(reviews[j+1].rating)) {
        //swap 
        var temp = reviews[j];
         reviews[j] = reviews[j+1];
         reviews[j+1] = temp;
      }
    }
 }
 cb();
}

function sortByDateLow(reviews,cb) {
    //Bubble sort by date
    for(var i = 0; i < reviews.length; i++) {
      for(var j = 0; j < reviews.length-1; j++) {
        var month1 = reviews[j].date_of_review.slice(0, reviews[j].date_of_review.indexOf("/"));
        var day1 = reviews[j].date_of_review.slice(reviews[j].date_of_review.indexOf("/")+1, reviews[j].date_of_review.lastIndexOf("/"));
        var year1 = reviews[j].date_of_review.slice(reviews[j].date_of_review.lastIndexOf("/")+1, reviews[j].date_of_review.length);

        var month2 = reviews[j+1].date_of_review.slice(0, reviews[j+1].date_of_review.indexOf("/"));
        var day2 = reviews[j+1].date_of_review.slice(reviews[j+1].date_of_review.indexOf("/")+1, reviews[j+1].date_of_review.lastIndexOf("/"));
        var year2 = reviews[j+1].date_of_review.slice(reviews[j+1].date_of_review.lastIndexOf("/")+1, reviews[j+1].date_of_review.length);
        
        if(parseInt(year1)>parseInt(year2)) {
            //swap
            var temp = reviews[j];
            reviews[j] = reviews[j+1];
            reviews[j+1] = temp;
        }else if(parseInt(year1) === parseInt(year2) && parseInt(month1)>parseInt(month2)){
            //swap
            var temp = reviews[j];
            reviews[j] = reviews[j+1];
            reviews[j+1] = temp;
        }else if (parseInt(year1) === parseInt(year2) && parseInt(month1)===parseInt(month2) && parseInt(day1) > parseInt(day2)) {
            //swap
            var temp = reviews[j];
            reviews[j] = reviews[j+1];
            reviews[j+1] = temp;
        }

      }
   }
   cb();
  }
  
  function sortByDateHigh(reviews,cb) {
    //Bubble sort by date
    for(var i = 0; i < reviews.length; i++) {
      for(var j = 0; j < reviews.length-1; j++) {
        var month1 = reviews[j].date_of_review.slice(0, reviews[j].date_of_review.indexOf("/"));
        var day1 = reviews[j].date_of_review.slice(reviews[j].date_of_review.indexOf("/")+1, reviews[j].date_of_review.lastIndexOf("/"));
        var year1 = reviews[j].date_of_review.slice(reviews[j].date_of_review.lastIndexOf("/")+1, reviews[j].date_of_review.length);

        var month2 = reviews[j+1].date_of_review.slice(0, reviews[j+1].date_of_review.indexOf("/"));
        var day2 = reviews[j+1].date_of_review.slice(reviews[j+1].date_of_review.indexOf("/")+1, reviews[j+1].date_of_review.lastIndexOf("/"));
        var year2 = reviews[j+1].date_of_review.slice(reviews[j+1].date_of_review.lastIndexOf("/")+1, reviews[j+1].date_of_review.length);
        
        if(parseInt(year1)<parseInt(year2)) {
            //swap
            var temp = reviews[j];
            reviews[j] = reviews[j+1];
            reviews[j+1] = temp;
        }else if(parseInt(year1) === parseInt(year2) && parseInt(month1)<parseInt(month2)){
            //swap
            var temp = reviews[j];
            reviews[j] = reviews[j+1];
            reviews[j+1] = temp;
        }else if (parseInt(year1) === parseInt(year2) && parseInt(month1)===parseInt(month2) && parseInt(day1) < parseInt(day2)) {
            //swap
            var temp = reviews[j];
            reviews[j] = reviews[j+1];
            reviews[j+1] = temp;
        }

      }
   }
   cb();
  }
