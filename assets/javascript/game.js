console.log('hi');

livesUI = document.getElementById("lives");

// returns true or false if guessedLetter is in wordLetter
function containsLetter(guessedLetter, wordLetter) {
	for (var i = 0; i < wordLetter.length; i++) {
		if (wordLetter[i] === guessedLetter) {
				return true;
			}	
	} return false;

}

//Are you ready?
//var isReady = confirm("Are you ready?");

// // if ready
// if (isReady) {

// //else 
// } else ();

// variable for letters
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// set a life variable
var lives = 3;

livesUI.innerHTML = lives;

// print number of lives
console.log(`You have ${lives} left!`);

// initialize word variable
var word = "random";

// initialize wordLetter array and set to length of word
var wordLetter = [word.length];

//lower case the word
word = word.toLowerCase();

//break up word into letters
for (var i = 0; i < word.length; i++) {
	wordLetter[i] = word.charAt(i); 
	console.log(wordLetter);
}	

//guessedLetter = the letter that is typed in
// guessedLetter = prompt("Guess a letter!");

	
do {
	
	//ask user to guess again
	guessedLetter = prompt("Guess a letter!"); 

	// document.getElementById("guessedLetter");
	// document.onkeyup = function(event) {
	// 	guessedLetter = event.key;
	// };

	// if you guess right!
	if (containsLetter(guessedLetter, wordLetter)) {
		console.log("yay");
		//wordLetter.remove(guessedLetter);
		console.log(wordLetter);

	// if you guess wrong
	} else {	
		console.log("wrong");
		lives--;
		console.log(lives);
		if (lives === 0) {
			break;
		}
	} 
} while (lives > 0);


