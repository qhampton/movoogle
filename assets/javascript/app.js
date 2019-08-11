// global variables
var foodChoice = ["Afghan", "African", "Senegalese", "South African", "American (New)", "American (Traditional)", "Arabian", "Argentine", "Armenian", "Asian Fusion", "Australian", "Austrian", "Bangladeshi", "Barbeque", "Basque", "Belgian", "Brasseries", "Brazilian", "Breakfast & Brunch", "British", "Buffets", "Burgers", "Burmese", "Cafes", "Themed Cafes", "Cafeteria", "Cajun/Creole", "Cambodian", "Caribbean", "Dominican", "Haitian", "Puerto Rican", "Trinidadian", "Catalan", "Cheesesteaks", "Chicken Shop", "Chicken Wings", "Chinese", "Cantonese", "Dim Sum", "Hainan", "Shanghainese", "Szechuan", "Comfort Food", "Creperies", "Cuban", "Czech", "Delis", "Diners", "Dinner Theater", "Ethiopian", "Fast Food", "Filipino", "Fish & Chips", "Fondue", "Food Court", "Food Stands", "French", "Mauritius", "Reunion", "Game Meat", "Gastropubs", "German", "Gluten-Free", "Greek", "Guamanian", "Halal", "Hawaiian", "Himalayan/Nepalese", "Honduran", "Hong Kong Style Cafe", "Hot Dogs", "Hot Pot", "Hungarian", "Iberian", "Indian", "Indonesian", "Irish", "Italian", "Calabrian", "Sardinian", "Sicilian", "Tuscan", "Japanese", "Conveyor Belt Sushi", "Izakaya", "Japanese Curry", "Ramen", "Teppanyaki", "Kebab", "Korean", "Kosher", "Laotian", "Latin American", "Colombian", "Salvadoran", "Venezuelan", "Live/Raw Food", "Malaysian", "Mediterranean", "Falafel", "Mexican", "Tacos", "Middle Eastern", "Egyptian", "Lebanese", "Modern European", "Mongolian", "Moroccan", "New Mexican Cuisine", "Nicaraguan", "Noodles", "Pakistani", "Pan Asia", "Persian/Iranian", "Peruvian", "Pizza", "Polish", "Polynesian", "Pop-Up Restaurants", "Portuguese", "Poutineries", "Russian", "Salad", "Sandwiches", "Scandinavian", "Scottish", "Seafood", "Singaporean", "Slovakian", "Soul Food", "Soup", "Southern", "Spanish", "Sri Lankan", "Steakhouses", "Supper Clubs", "Sushi Bars", "Syrian", "Taiwanese", "Tapas Bars", "Tapas/Small Plates", "Tex-Mex", "Thai", "Turkish", "Ukrainian", "Uzbek", "Vegan", "Vegetarian", "Vietnamese", "Waffles", "Wraps"];

var movieChoice = ["Action & Adventure", "Anime", "Children & Family Movies", "Classic Movies", "Comedies", "Cult Movies", "Documentaries", "Dramas", "Faith & Spirituality", "Gay & Lesbian Movies", "Horror Movies", "Independent Movies", "International Movies", "Musical", "Period Pieces", "Romantic Movies", "Sci-Fi & Fantasy", "Sports & Fitness", "TV Shows", "Thrillers"];

var movieSelect;
var foodSelect;
var movieIndexMax = movieChoice.length;
var foodIndexMax = foodChoice.length;

// global functions 

// when the user scrolls down the button displays (bt)
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document(bt)
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// copy function to invite friends(bt)
function copytext() {
  var addVal = $("#copy");
  $("#copy").val($("#copy").val()+" Join me for a MOVØGGLE night. The movie and food are on the way! All that's left is you.");
  console.log(addVal.val());

  var copytext = addVal.select();
  document.execCommand("copy");
  // alert("Copied the message: " + copytext.val());
  console.log(copytext.val());
  
  $("#message").text(copytext.val());
  $('.modal').modal();

  $("#copy").val("");
}

function randomResult() {
movieSelect = (Math.floor(Math.random()* movieIndexMax));
foodSelect = (Math.floor(Math.random()* foodIndexMax));
$(".food-label").addClass("active");
var movieText = $("#movie-search").val(movieChoice[movieSelect]);
var foodText = $("#food-search").val(foodChoice[foodSelect]);


}


// =============================================================================================
// main app logic
// =============================================================================================

$(document).ready(function () {
  // parallax display function(bt)
  $('.parallax').parallax();
  // modal function
  $('.modal').modal();

  $("#random-button").on("click", randomResult);

  // window scroll button(bt)
  window.onscroll = function () {
    scrollFunction()
  };
  $(document.body).on("click", "#myBtn", function () {
    topFunction();
  });

  // copying message to invite friends(bt)
  $("#copy-button").on("click", function(e){
    e.preventDefault();
    copytext();
  })

});