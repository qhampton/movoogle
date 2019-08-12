    //================================Should this information go in the APIKey file?===================================//
    var movie_Inquery = "";
    var utellyLink = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=';
    var country = '&country=us';
    
    //var queryURL;
    var utellyHead = {
        method: "GET",
        headers: {
            "x-rapidapi-host": 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
            "x-rapidapi-key": utellyKey
        },
    };
    //===============================================================================================================//
    var OMDBResults = {
        Title: '',
        Released: '',
        Rated: '',
        Actors: '',
        Ratings: '',
        Plot: ''
    };

    $("#movie-form").on("submit", function (event) {
        event.preventDefault();
        movie_Inquery = $("#movie-search").val().trim();

        if (movie_Inquery === "") {
            return;
        } else {
            utellyCall();
            //createMovieCards();
        }
    });

    function createMovieCards(data) {
        $(".movie-card-display").empty();
        console.log(data);
        for (var i = 0; i < data.results.length; i++) {
            console.log("Passing OMDB function : " + data.results[i].name);
            setTimeout(OMDBCall(OMDBResults, data.results[i].name), 1000) //very important, gets OMDB information PER card generated
            // .then(cardAssemble())
            // .catch(console.log("ERROR ON PROMISE: Something went wrong."));
            console.log("about to display OMDB results...")
            console.log(OMDBResults);
            var releaseVar = JSON.parse(JSON.stringify(OMDBResults));
            console.log("Here's the release date: " + JSON.parse(JSON.stringify(OMDBResults.Released)));
            console.log(releaseVar.Released);

            // function cardAssemble() {

            //Creates columns to be used within movie display section
            var newCardContainer = $("<div class = 'col s6 card-container'>");

            //NewCardImage
            var newCard = $("<div>").addClass("card");
            var newCardImage = $("<div class = 'card-image waves-effect waves-block waves-light'>");
            var cardImage = $("<img class = 'activator movie-image' height = '200px'>").attr("src", data.results[i].picture);
            cardImage.attr("alt", data.results[i].picture);
            $(newCardImage).append(cardImage);
            // end newCardImage

            // newCardContent
            var newCardContent = $("<div class = 'card-content'>");
            var cardSpan = $("<span class = 'card-title activator grey-text text-darken-4 movie-title'>").html(data.results[i].name); // title of Movie goes here
            var cardIcon = $("<i class = 'material-icons right'>").html("more_vert");
            var cardYearRating = $("<p class = 'year-rating'>").html("Release: " + OMDBResults.Released + ", Rated " + OMDBResults.Rated);
            var cardActors = $("<p class = 'actors'>").html("Actors: " + OMDBResults.Actors);
            var cardRotten = $("<p class = 'rotten'>").html("Rotten Tomato Score: " + OMDBResults.Ratings);
            var cardTrailer = $("<p class = 'trailer'>");
            var cardTrailerAnchor = $("<a>").html("Youtube Trailer");
            cardTrailerAnchor.attr("href", "https://www.youtube.com/");
            cardTrailerAnchor.attr("target", "blank");
            $(cardTrailer).append(cardTrailerAnchor); //appends anchor tag within our trailer p tag
            $(cardSpan).append(cardIcon); //appends i tag within our span tag
            $(newCardContent).append(cardSpan, cardYearRating, cardActors, cardRotten, cardTrailer);

            // newCardReveal
            var cardReveal = $("<div class = 'card-reveal'>");
            var cardSpanReveal = $("<span class = 'card-title grey-text text-darken-4 movie-title'>").html(data.results[i].name); // title of Movie goes here
            var cardIconReveal = $("<i class = 'material-icons right'>").html("more_vert");
            var cardPlot = $("<p class = 'plot'>").html(OMDBResults.Plot);
            var cardTable = $("<table class = 'striped'>");
            var tableAdd = $("<thead>").append($("<tr>").append($("<th width = 'auto'>").text("Stream location"), $("<th width = 'auto'>").text("Stream url")));
            var tableBodyAdd = $("<tbody>");
            for (var j = 0; j < data.results[i].locations.length; j++) {
                // console.log("stream loop ran " + (j + 1) + "  times")
                $(tableBodyAdd).append($("<tr>").append($("<td>").text(data.results[i].locations[j].name), $("<td>").html("<a href = '" + data.results[i].locations[j].url + "' target = 'blank'>" + data.results[i].locations[j].url + "</a>")));
            };

            $(cardSpanReveal).append(cardIconReveal);
            $(cardTable).append(tableAdd, tableBodyAdd);
            $(cardReveal).append(cardSpanReveal, cardPlot, cardTable);

            //card assembly
            $(newCard).append(newCardImage, newCardContent, cardReveal);
            $(newCardContainer).append(newCard);
            $(".movie-card-display").append(newCardContainer);

            // if (OMDBResults.Released !== '') {
            //     cardYearRating.html("Release: " + OMDBResults.Released + ", Rated " + OMDBResults.Rated);
            // } else {
            //     alert("OMDBResults.Released is still empty :/");
            // }

        }


    };

    function utellyCall() {
        // console.log("This is movie_Inquery: " + movie_Inquery);
        var movieIWantToWatch = movie_Inquery
        // console.log("This is movieIWantToWatch: " + movieIWantToWatch);
        queryURL = utellyLink + movieIWantToWatch + country;
        //Not using AJAX, API gave us 
        fetch(queryURL, utellyHead)
            .then(response => response.json())
            .then(data => createMovieCards(data))
            .catch(e => console.log(e));
    }