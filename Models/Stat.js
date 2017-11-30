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