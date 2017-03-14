
var buttons = ["Donald Trump","Barrack Obama","Will Smith", "Dallas Cowboys"];
var still;
//Create a button an add the name to the button
//put the buttons on the screen
var addButton = () => {
	//attaching names to button
	buttons.map(function(x){
		var button =$("<button>");
			button.attr('data-name',x)

			button.html(x);
			$('.buttoncontainer').append(button);
	});
}

var runAjax = function(link){
	//dump previous images
	$('.images').empty();
	$.ajax({ url: link, method: "Get"})
	.done(function(response){
	     //log data
	 //    console.log(response);
		// console.log(response.data[0].images.fixed_height.url);
		// console.log(response.data[0].images.fixed_height_still.url);
		//creating a image tag and adding the first/zero index image
		//and diplaying it to the image
		for (var i = 0; i < response.data.length ; i+=1) {
		
		var image =$("<img>");
			image.attr({
				src:response.data[i].images.fixed_height.url,
				"data-animate":response.data[i].images.fixed_height.url,
				"data-still":response.data[i].images.fixed_height_still.url,
				"data-name": "still"
			});

			$('.images').append(image);
		}
	});
};

addButton();

//Empty the container
//Grabbing users input and push it to the array
//display the new array
$('#search').on('click', function(){
	$('.buttoncontainer').empty();
	var userValue = $('#animal-value').val().replace(' ', '+');
	//Validation
	if (userValue !== '') {
			buttons.push(userValue);	
		var link = "http://api.giphy.com/v1/gifs/search?q="+ userValue +"&api_key=dc6zaTOxFJmzC";
			runAjax(link);	
	}

	//empty text after userinput
	$('#animal-value').val('');

	addButton();
	console.log(buttons);
});

//attach this event handler to all buttons in the parent container
//Oh YeaH! is all private
$('.buttoncontainer').on('click', 'button', function(){

	var btnValue = $(this).attr('data-name');
	var link = "http://api.giphy.com/v1/gifs/search?q="+ btnValue +"&api_key=dc6zaTOxFJmzC";
	runAjax(link);
});

$(document).on('click', 'img', function(){

		console.log($(this).attr('data-still'));
		if($(this).attr('data-name') === "still"){
			$(this).attr("src",$(this).attr('data-still'));
		}

});


