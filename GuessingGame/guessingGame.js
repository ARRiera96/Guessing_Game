/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber,
    numberOfGuesses= 4,
    lastGuess= 0;  
    clickedMoreThanOnce= false; 



/* **** Guessing Game Functions **** */



function generateWinningNumber(){
	winningNumber= Math.floor((Math.random() * 100) + 1);
}

// Fetch the Players Guess
generateWinningNumber(); 

function assignGuessValues(){
			playersGuess= Number($('.field').val());
			console.log(playersGuess);	
			$('.field ').val("");
}

function warmOrCold(){
	if(Math.abs(winningNumber-playersGuess)<= 3)
		return "warm";
	else
		return "cold";

}

function playersGuessSubmission(){
	// add code here
	playersGuess= Number($('.field').val());
	//console.log(playersGuess);	
	$('.field ').val("");
}



// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if( playersGuess === winningNumber){
		$('#status').text('Are you physic? You win');
		$('#guess-count').text('Play again if you want');	
	}	
	else if(lastGuess===playersGuess){

		console.log("You gave the same guess as last time: "+ lastGuess);
		//tell users they must indicate a new value
		$('#status').text('Same Guess as before');
				 			
				
	}
	else  {
		//check to see how warm or cold they are
		//output how warm or cold they were
		console.log('im now checking to see if im warm or cold ');
		var temp= warmOrCold();
		var elTemp= ''; 

		if(warmOrCold()=== 'warm'){
			elTemp= $("<span style='color:red'>" + temp +"</span>");
		}
		else{
			elTemp= $("<span style='color:blue'>" + temp +"</span>");}
			$('#status').text('You are ').append( elTemp  );
			lastGuess=playersGuess; 
			//update number of guesses and output it 
		if(clickedMoreThanOnce){
			numberOfGuesses--;
		}
		clickedMoreThanOnce=true; 
	}
}




// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	$('#guess-count').text(winningNumber);
	console.log("hint has been clicked");
}

// Allow the "Player" to Play Again

function playAgain(){
	generateWinningNumber(); 
	// add code here
	$(".field").val("");
	numberOfGuesses=5; 
	lastGuess= 0; 
	$('#guess-count').text(numberOfGuesses+" Guesses Remaining");
	$(".submit").on("click");
	$('#status').css("display","none");
	clickedMoreThanOnce=false;
}

generateWinningNumber();

/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){

$(".gameForm").on("submit", function(e){
	e.preventDefault();
	if($(".field").val() === ""){
		//make status h3 visible 
		$('#status').text("Please input something");
		$('#status').css("display","block");	
	}
	else{//The user has entered something(: 
		//Do you have any guesses left? 
		assignGuessValues();
		checkGuess();
		if(numberOfGuesses>0){
			
			
			 
			$('#guess-count').text(numberOfGuesses+" Guesses Remaining");
			
			$('#status').css("display","block");
			
		}
		else{
				//output that they lost
				$('#status').text('You lost. Nygma get the bat.');
				// disable the event handler for the submit button 
				//$('.submit').off('click');
				// and indicate to click play again
				$('#guess-count').text('Play again if you want');
			
		}
				
	}
	
});

$(".hint").on("click", provideHint);

$(".play_again").on("click", playAgain);

});