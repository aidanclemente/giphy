// array of cartoons

// on window load function to loop through cartoons array and create buttons dynamically

// on click for ajax call for buttons 
	//ajax call 
		//url for still
		//url for animated
		//rating
	//default load still url 
	// If statement for on click animate/still

//click on new button, clears the prvious giphys and loads new

// make sure they can't repeat buttons (when comparing, change to all lower)

var cartoons = ["The Simpsons", "Family Guy", "My Little Pony", "She Ra", "The Smirfs", "Sofia the First", "Story Bots", "Peppa Pig", "Popeye", "Tiny Toon Adventures", "Pinky and the Brain ", "Gargoyles", "Darkwing Duck", "Animaniacs", "Dexter's Laboratory", "Daria", "Hey Arnold!", "Johnny Bravo", "Rocko's Modern Life", "Ed, Edd n Eddy", "Captain Planet and the Planeteers", "The Ren and Stimpy Show"];

function buttonMaker(){

//Clears the div 
	$("#buttons").empty();

	for (var i = 0; i < cartoons.length; i++) {
		var button = $("<button>");
		button.addClass("button");
		button.attr("value", cartoons[i]);
		button.text(cartoons[i])


		$("#buttons").append(button);
	}
};


$("#addCartoon").on("click", function(){

	var newCartoon = $("#cartoonInput").val().trim();

// Allows enter to submit
    event.preventDefault();

// Adds the submitted cartoon to the array
	cartoons.push(newCartoon);	

// shows updated buttons
	buttonMaker();
})	

//shows initial array buttons
buttonMaker();

// on click for ajax call for buttons 
	//ajax call 
		//url for still
		//url for animated
		//rating
	//default load still url 
	// If statement for on click animate/still

$("button").click(function() {
	var cartoon = $(this).val().trim();
	var apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + apiKey;

	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {

		$("#cartoons").empty();

//To make it easier for calling the image information
		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			
			var newDiv = $("<div>");

			var rating = $("<p>").text("Rating: " + results[i].rating);

			var image = $("<img>");

			//setting the img src to still
			image.attr("src", results[i].images.original_still.url);

			newDiv.addClass("giphy");
			newDiv.append(rating);
			newDiv.append(image);
			$("#cartoons").append(newDiv);
		}
	})
})