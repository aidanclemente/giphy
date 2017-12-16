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
	$("#cartoons").empty();

	for (var i = 0; i < cartoons.length; i++) {
		var button = $("<button>");
		button.addClass("button");
		button.text(cartoons[i])

		$("#buttons").append(button);
	}
};

buttonMaker();