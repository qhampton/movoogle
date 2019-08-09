$(document).ready(function () {
    $("#movie-search").on("submit", function (event) {
        event.preventDefault();
        var movie_Inquery = $("#movie-search").val().trim();
        alert(movie_Inquery);
    });
});