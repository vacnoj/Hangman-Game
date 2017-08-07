$(document).ready(function() {

console.log('hi');

// set a life variable
var lives = 7;


// print number of lives
console.log(`You have ${lives} left!`);

//initialize the array of words
var wordsArray;

// initialize word variable
var word;

// initialize wordLettersArray array
var wordLettersArray = [];

// an array of already guessed letters
var alreadyGuessedLettersArray = [];

// if user guesses right, it goes to this array
var guessedRightLettersArray = [];

// if guessed wrong it will go to this array
var guessedWrongLettersArray = [];

// array that shows user what letters they got right
var wordLettersArrayUI = [];

// sets the prompt area
var askUser = $("#prompt");

// game over true/false
var gameOver=false;

// get a word from library
getWord(wordsArray, word);
// display it on the screen
$("#wordLettersArrayUI").html(wordLettersArrayUI.join(" "));
askUser.text("Guess a Letter!");

$("#animals").click(function() {
	$("#animals").addClass("active");
	$("#lol").removeClass("active");
	$("#sports").removeClass("active");
	playAgain();
	getWord(wordsArray, word);
	$("#wordLettersArrayUI").html(wordLettersArrayUI.join(" "));
	askUser.text("Guess a Letter!");
});

$("#lol").click(function() {
	$("#lol").addClass("active");
	$("#animals").removeClass("active");
	$("#sports").removeClass("active");
	playAgain();
	getWord(wordsArray, word);
	$("#wordLettersArrayUI").html(wordLettersArrayUI.join(" "));
	askUser.text("Guess a Letter!");
});

$("#sports").click(function() {
	$("#sports").addClass("active");
	$("#lol").removeClass("active");
	$("#animals").removeClass("active");
	playAgain();
	getWord(wordsArray, word);
	$("#wordLettersArrayUI").html(wordLettersArrayUI.join(" "));
	askUser.text("Guess a Letter!");
});

// set key up to guessedLetter
$(document).keyup(function(e) {
	
	if(gameOver===false) {
		guessedLetter = e.key;
		guessedLetter = guessedLetter.toUpperCase();
		askUser.text("Guess a Letter!");

		if(youWin(wordLettersArray)) {
				$("#wordLettersArrayUI").text("YOU WIN!");
				$("#alreadyGuessedLettersArrayUI").text("Play Again?");
		}

		if (alreadyGuessed(alreadyGuessedLettersArray, guessedLetter)) {
			$("#prompt").text(`You already guessed ${guessedLetter}!`);
		} else if (containsLetter(guessedLetter, wordLettersArray)) {
			$("#wordLettersArrayUI").html(wordLettersArrayUI.join(" "));
			if(youWin(wordLettersArray)) {
				$("#prompt").text("YOU WIN!");
				$("#wordLettersArrayUI").text(word);
				$("#alreadyGuessedLettersArrayUI").text("Play Again?");
			}
		} else {
			makeAlreadyGuessedArray(guessedLetter, wordLettersArray);
			$("#alreadyGuessedLettersArrayUI").html(guessedWrongLettersArray.join(" "));
			lives--;
		}

		switch(lives) {
			case 7:
				$(".hangman").attr("src", "assets/images/empty.png");
				break;
			case 6:
				$(".hangman").attr("src", "assets/images/head.png");
				break;
			case 5:
				$(".hangman").attr("src", "assets/images/body.png");
				break;
			case 4:
				$(".hangman").attr("src", "assets/images/leftArm.png");
				break;
			case 3:
				$(".hangman").attr("src", "assets/images/rightArm.png");
				break;
			case 2:
				$(".hangman").attr("src", "assets/images/leftLeg.png");
				break;
			case 1:
				$(".hangman").attr("src", "assets/images/rightLeg.png");
				break;
			case 0:
				$(".hangman").attr("src", "assets/images/dead.png");
				$("#wordLettersArrayUI").text(word);
				$("#prompt").text("LOSER!");
				gameOver=true;
				$("#alreadyGuessedLettersArrayUI").text("Play Again?");
				break;
		}
	} else {
		$("#wordLettersArrayUI").text("GAME OVER");
		$("#alreadyGuessedLettersArrayUI").text("Play Again?");
	}

});	

$("#playAgain").click(function() {
	playAgain();
});

// returns true or false if guessedLetter is in wordLettersArray
function containsLetter(guessedLetter, wordLettersArray) {
	for (var i = 0; i < wordLettersArray.length; i++) {
		// if the letter is in the word
		if (wordLettersArray[i] === guessedLetter) {
			// run makeAlreadyGuessedArray
			makeAlreadyGuessedArray(guessedLetter, wordLettersArray);
			// runs the show letter in order to show user they guessed right
			showLetter(guessedLetter, wordLettersArray, wordLettersArrayUI);
			// removes that letter from the array
			removeGuessedLetter(guessedLetter, wordLettersArray);
			return true;
		}	
	} return false;
}

// function that takes the letter from the wordLettersArray and puts it in an array of already guessed letters
function makeAlreadyGuessedArray(guessedLetter, wordLettersArray) {
	for (var i = 0; i < wordLettersArray.length; i++) {
		if (wordLettersArray[i] === guessedLetter) {
			guessedRightLettersArray.push(guessedLetter);
			alreadyGuessedLettersArray.push(guessedLetter);
			return alreadyGuessedLettersArray;
		} 
	}
		guessedWrongLettersArray.push(guessedLetter);
		alreadyGuessedLettersArray.push(guessedLetter);
		return alreadyGuessedLettersArray;
}

// function that removes the guessed letter from the correct letters so that you can't keep guessing the same letter
function removeGuessedLetter(guessedLetter, wordLettersArray) {
	for (var i = 0; i < wordLettersArray.length; i++) {
		if (wordLettersArray[i] === guessedLetter) {
			wordLettersArray[i] = " ";
		}
	}
}

// returns true or false if a letter has already been guessed
function alreadyGuessed(alreadyGuessedLettersArray, guessedLetter) {
	for (var i = 0; i < alreadyGuessedLettersArray.length; i++) {
		if (alreadyGuessedLettersArray[i] === guessedLetter) {
			return true;
		}
	} return false;
}

function showLetter(guessedLetter, wordLettersArray, wordLettersArrayUI) {
	for (var i = 0; i < wordLettersArray.length; i++) {
		if (guessedLetter === wordLettersArray[i]) {
			wordLettersArrayUI[i] = guessedLetter;
		}
	} return wordLettersArrayUI;
}

//checks if you have won!
function youWin(wordLettersArray) {
	for (var i = 0; i < wordLettersArray.length; i++) {
		if (wordLettersArray[i] !== " ") {
			return false;
		}
	} return true;	
}


// function that will get another word from the array
function getWord(wordsArray) {
	var wordsArrayLeauge;
	var wordsArrayAnimals;
	var wordsArraySports;
	wordsArraySports = ["Soccer", "Football", "Hockey", "Lacross", "Field Hockey", "Baseball"];
	wordsArrayAnimals = ["Dog", "Cat", "Bear", "Moose", "Donkey", "Cow", "Dragon"];
	wordsArrayLeauge = ["Tryndamere", "Teemo", "Caitlyn", "Oriana", "Twitch", "Morgana", "Jarvan the 4th", "Talon", "LeBlanc", "Tristana", "Volibear", "Veigar", "Fiddle Sticks", "Zyra", "Viktor", "Lux"];
	if ($("#lol").hasClass("active")) {
		wordsArray = wordsArrayLeauge;
	} else if ($("#animals").hasClass("active")) {
		wordsArray = wordsArrayAnimals;
	} else if ($("#sports").hasClass("active")) {
		wordsArray = wordsArraySports;
	}
	word = wordsArray[Math.floor(Math.random() * wordsArray.length)]; 

	//break up word into letters
	for (var i = 0; i < word.length; i++) {
		wordLettersArray[i] = word.charAt(i).toUpperCase(); 
		console.log(wordLettersArray);
	}	

	// initialize word user will see as an array
	wordLettersArrayUI = new Array(word.length);

	// fills each spot with a blank spot so the user knows how many letters to guess!
	wordLettersArrayUI.fill("___");

	// // takes away the commas
	// wordLettersArrayUI.join("*");
	return wordLettersArray;
}

function playAgain() {
	$(".hangman").attr("src", "assets/images/empty.png");
	wordLettersArray = [];
	alreadyGuessedLettersArray = [];
	guessedRightLettersArray = [];
	guessedWrongLettersArray = [];
	wordLettersArrayUI = [];
	getWord(wordsArray, word);
	$("#wordLettersArrayUI").html(wordLettersArrayUI.join(" "));
	$("#alreadyGuessedLettersArrayUI").html("");
	askUser.text("Guess a Letter!");
	lives=7;
	gameOver=false;
}
});




