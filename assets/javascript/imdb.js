function OMDBCall(obj, movieName) {
    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log("You've entered OMDB call, returning data!");
        // console.log(movieName);
        obj.Title = response.Title;
        obj.Released = response.Released;
        obj.Rated = response.Rated;
        obj.Actors = response.Actors;
        if (response.Ratings.length >= 2) {
            obj.Ratings = response.Ratings[1].Value; //if Rotten tomatoes has a score, it's stored in the 2nd element
        }
        else {
            obj.Ratings = response.Ratings[0].Value; //display whatever
        }
        obj.Plot = response.Plot;

        console.log("obj object should now be populated with '" + obj.Title + "' data.");
        console.log(obj);
        // alert("OMDB is now populated with " + obj.Title);
        // cardYearRating.html("Release: " + obj.Released + ", Rated " + obj.Rated);
        // cardActors.html("Actors: " + obj.Actors);
        // cardRotten.html("Rotten Tomato Score: " + obj.Ratings);
        // cardPlot.html(obj.Plot);
        return;
    });

};