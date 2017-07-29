console.log('hi');

livesUI = document.getElementById("lives");

// set a life variable
var lives = 3;

livesUI.innerHTML = lives;

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

// array that shows user what letters they got right
var wordLettersArrayUI = [];

do {

	// get a word from library
	getWord(wordsArray, word);
	// alert(word);
	alert(wordLettersArrayUI.join(" "));

	do {
		

		//ask user to guess 
		guessedLetter = prompt("Guess a letter!");
		guessedLetter = guessedLetter.toLowerCase();

		while (guessedLetter.length > 1) {
			alert("Only type one letter at a time!");
			guessedLetter = prompt("Guess a letter!");
		}
		
		// if nothing was typed ask to do it again
		while (guessedLetter === "") {
			alert("nothing typed!");
			guessedLetter = prompt("Guess a letter!");		
		}


		// document.getElementById("guessedLetter");
		// document.onkeyup = function(event) {
		// 	guessedLetter = event.key;
		// };

		while (alreadyGuessed(alreadyGuessedLettersArray, guessedLetter)) {
			alert(`You already guessed ${guessedLetter}!`);
			guessedLetter = prompt("Guess a letter!");
		}

		// if you guess right!
		if (containsLetter(guessedLetter, wordLettersArray)) {
			console.log("yay");
			console.log(wordLettersArray);
			console.log(alreadyGuessedLettersArray);
			alert(wordLettersArrayUI.join("  "));
			if (youWin(wordLettersArray)) {
				alert("You Win!");
				break;
			}

		// if you guess wrong
		} else {	
			alert("wrong");
			lives -= 1;
			alert(`${lives} lives left!`);
			alert(wordLettersArrayUI.join("  "));
			if (lives === 0) {
				alert("Loser!");
				alert(word);
				break;
			}
		} 
	} while (lives > 0);
	alreadyGuessedLettersArray = [];
	lives = 3;
	wordLettersArray = [];
} while (playAnother() === true);


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
			alreadyGuessedLettersArray.push(guessedLetter);
			return alreadyGuessedLettersArray;
		}
	}	
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

// ask if you want to play another
function playAnother() {
	return confirm("Do you want to play again?");
}

// function that will get another word from the array
function getWord(wordsArray) {
	wordsArray = ["Tryndamere", "Teemo", "Caitlyn", "Oriana", "Twitch", "Morgana", "Jarvan the 4th", "Talon", "LeBlanc", "Tristana", "Volibear", "Veigar", "Fiddle Sticks", "Zyra", "Viktor", "Lux"]
	word = wordsArray[Math.floor(Math.random()*16)]; 
	//lower case the word
	word = word.toLowerCase();

	//break up word into letters
	for (var i = 0; i < word.length; i++) {
		wordLettersArray[i] = word.charAt(i); 
		console.log(wordLettersArray);
	}	

	// initialize word user will see as an array
	wordLettersArrayUI = new Array(word.length);

	// fills each spot with a blank spot so the user knows how many letters to guess!
	wordLettersArrayUI.fill("__");

	// // takes away the commas
	// wordLettersArrayUI.join("*");
	return wordLettersArray;
}





