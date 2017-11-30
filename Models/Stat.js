function averageReviewScore(reviews, cb) {
    var totalScore = 0;
    for(var i = 0; i < reviews.length; i++) {
        totalScore += reviews[i].rating;
    }
    var averageScore = totalScore / reviews.length;

    cb(averageScore);
}

function averageReviewScoreWithKeyword(reviews, word, cb) {
    var totalScore = 0;
    var numReviews = 0;
    for(var i = 0; i < reviews.length; i++) {
        if(reviews[i].includes(word)) {
            numReviews++;
            totalScore += reviews[i].rating;
        }
    }
    var averageScore = totalScore / numReview;
    cb(averageScore);
}

function getBestReviews(reviews, number, cb) {
    //fill default reviews 
    var bestReviews = [];
    var i = 0;
    var lowestRating = 0;
    //fill in the first "number" of reviews
    while(i < reviews.length && i < number) {
        bestReviews.push(reviews[i]);
        if(reviews[i].rating < lowestRating) {
            lowestRating = reviews[i].rating;
        }
        i++;
    }
    if(i === reviews.length) {
        //Requested all reviews
        cb(bestReviews);
        return;
    }
    
    for(var i = 0; i < reviews.length; i++) {
        if(reviews[i].rating > lowestRating) {
            //Found a better rating than the worst one in the array
            //Replace that review with this one
            for(var j = 0; j < bestReviews.length; j++) {
                if(bestReviews[j].rating <= lowestRating) {
                    //Repace with new rating
                    bestReviews[j] = reviews[i];
                    lowestRating = bestReviews[j].rating;
                    break;
                }
            }
            //Calculate new lowest rating
            for(var j = 0; j < bestReviews.length; j++) {
                if(bestReviews[j].rating <= lowestRating) {
                    lowestRating = bestReviews[j].rating;
                }
            }
        }
    }

    cb(bestReviews);
}
