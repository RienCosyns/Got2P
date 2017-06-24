var el = document.querySelector("#el");

var currentRating = 0;
var maxRating = 5;
var callback = function(rating){
    alert(rating);
}

var myRating = rating(el, currentRating, maxRating, callback);

