//DOM and global elements
var foodInput = $("#food-search");
var zipInput = $("#zip-search");
var yelpLink = "https://api.yelp.com/v3/businesses/search?term="
var queryURL = "";

//search input calls on API 
$("#yelp-submit").on("click", function (event) {
    //stop refresh
    event.preventDefault();
    if ((foodInput.val().trim() === "") && (zipInput.val().trim() === "")) {
        return;
    }
    //if input run yelp call
    else {
        yelpCall();
    }
    foodInput.val("");
    // zipInput.val(""); //commented out so zip code would stay and they would not need to enter each time
});

function yelpCall() {
    // Grabbing and storing the data-found property value from the input
    var findFood = $(foodInput).val();
    var findZip = $(zipInput).val();
    console.log(findFood);
    console.log(findZip);
    // Constructing a queryURL using the findFood name
    queryURL = yelpLink + findFood + "&apiKey=" + yelpKey + "&location=" + findZip + "&limit=4";
    displayResult(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {
            Authorization: "Bearer " + yelpKey
        }
    }).then(function (response) {
        console.log(response);

        // empty div for new search
        $("#food").empty();

        // Looping through each result item
        for (var i = 0; i < response.businesses.length; i++) {
            //Creating and storing a div tag and class
            var resultDiv = $("<div class='card horizontal'>");
            var cardImage = $("<div class='card-image'>");
            var cardStacked = $("<div class='card-stacked'>");
            var cardContact = $("<div class='card-content'>");

            //image
            var resImg = $("<img height='150px' width='200px'>").attr("src", response.businesses[i].image_url);
            //restaurant name
            var resName = $("<div class='card-title'>").text(response.businesses[i].name);
            //rating and price
            var resRP = $("<p>" + response.businesses[i].rating + "<i class='material-icons tiny'>star</i> Price: " + response.businesses[i].price + "</p>");
            //category
            var resCategory = $("<p>").text(response.businesses[i].categories[0].title);
            //phone number
            var resNumber = $("<p>").text(response.businesses[i].display_phone);
            //address
            var resAddress = $("<p>").text(response.businesses[i].location.display_address);
            //restaurant site
            var resWebsite = $("<a href='" + response.businesses[i].url + "'target='_blank'>Restaurant Link</a>");
            // Appending the information to the resultDiv
            cardImage.append(resImg);
            cardStacked.append(resName, cardContact);
            cardContact.append(resRP, resCategory, resNumber, resAddress, resWebsite);
            resultDiv.append(cardImage, cardStacked);
            $("#food").append(resultDiv);
        }
    })
}

function displayResult(queryURL) {
    //using this ajax (prefilter) to be able to manipulate data before sending to server
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && $.support.cors) {
            options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
        }
    });
}