var cartoons = ["The Simpsons", "Family Guy", "My Little Pony", "She Ra", "The Smurfs", "Sofia the First", "Story Bots", "Peppa Pig", "Popeye", "Tiny Toon Adventures", "Pinky and the Brain ", "Gargoyles", "Darkwing Duck", "Animaniacs", "Dexter's Laboratory", "Daria", "Hey Arnold!", "Johnny Bravo", "Rocko's Modern Life", "Ed, Edd n Eddy", "Captain Planet and the Planeteers", "The Ren and Stimpy Show"];

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


$("#addCartoon").on("click", function() {

	var lowerCaseCartoons = [];
	var newCartoon = $("#cartoonInput").val().trim();
// Allows enter to submit
    event.preventDefault();

    for (var i = 0; i < cartoons.length; i++) {	
    	lowerCaseCartoons.push(cartoons[i].toLowerCase());
    }

// Makes sure there's a value and Checks to see if the button already exists
    if (newCartoon == "") {
		alert("Please enter a Cartoon");
	} else if (lowerCaseCartoons.indexOf(newCartoon.toLowerCase()) == -1) {
	// Adds the submitted cartoon to the array
		cartoons.push(newCartoon);	
	// shows updated buttons
		buttonMaker();
	// Resets the value to show placeholder
		$("form").trigger("reset");
	} else {
		alert("Please enter a new cartoon!");
	}

});	

//shows initial array buttons
buttonMaker();

//Event Binder for now and future buttons
//div is the parent element and button is the decendent 
$("div").on("click", "button", function() {

	var cartoon = $(this).val().trim();
	var apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";
// Limits the gifs ratings to pg and under
	var limitRating = "&rating=pg";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + apiKey + limitRating;

	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {

		$("#cartoons").empty();

	//Makes calling the image information cleaner
		var results = response.data;

	//Alerts if no gifs are found
		if (results.length == 0) {
			alert("No Gifs found for " + cartoon);
		}
	
	//Taking returned information and putting gifs and rating on DOM
		for (var i = 0; i < results.length; i++) {
			
			var newDiv = $("<div>");
			var p = $("<p>").text("Rating: " + results[i].rating);
			var image = $("<img>");
			var stillURL = results[i].images.fixed_height_still.url;
			var animateURL = results[i].images.fixed_height.url;

		// Giving initial data-state still 
			image.attr("data-state", "still");

		// Giving URLs for pausing/starting animation
			image.attr("data-still", stillURL);
			image.attr("data-animate", animateURL);

		// Setting the img initial src to still
			image.attr("src", stillURL);
		// Giving images class
			image.addClass("giphy");

		// Gave class for css purposes
			newDiv.addClass("giphy");

			newDiv.append(p);
			newDiv.append(image);
			$("#cartoons").append(newDiv);
		} console.log(response);
	});

});

//Event Binder for animation stop/start
$("div").on("click", "img", function() {

// Stores the data-state of the giphy clicked in variable
	var state = $(this).attr("data-state");

// URLs for giphy clicked
	var srcStill = $(this).attr("data-still");
	var srcAnimate = $(this).attr("data-animate");

	if (state === "still") {
		$(this).attr("src", srcAnimate);
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", srcStill);
		$(this).attr("data-state", "still");
	}
});

// Source: https://github.com/jquery/jquery-mobile/issues/1079
// Keyboard for input area on touch devices
$(document).on('pageinit', '[data-role="page"]', function () {
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
		$('input, textarea').focusin(function() {
		if ($(this).arrt('type').toLowerCase() != 'number');
		$(this).focus();
		});
	}
});

$("#clear").on("click", function(){
	$("#cartoons").empty();
});