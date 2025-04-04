let guessedChars = [];

let wrongGuessesMax = 10;
let wrongGuesses = 0;

let hangmanImg = document.getElementById("hangmanImg");

let guessDisabled = false;

let correctWord;
let resultWord;

// Main code for making a new guess word
function getInput(event) {
    if (event.key !== 'Enter')
        return;

    let input = document.getElementById("wordInput").value;
    let inputArr = input.toUpperCase().split("");

    correctWord = input;

    resultWord = hideString(correctWord).split("");
    document.getElementById("temp-result").textContent = resultWord.join("");

    // Clears input field and guessed chars, resets guesses
    document.getElementById("wordInput").value = "";
    guessedChars = [];
    updateGuessedCharsText(); 
    wrongGuesses = 0;
    guessDisabled = false;
    document.getElementById('title').textContent = 'Hangman';

    hangmanImg.src = "/assets/hangman/0.jpg";
}

// Return true if letter/ false if not
function isLetter(char) {
    char = char.toUpperCase();
    return (char.length === 1) && (char >= 'A' && char <= 'Z' || char == 'Å' || char == 'Ä' || char == 'Ö');
}

// Returns a hidden string
function hideString(str) {
    let result = "";
    
    // Replace all letters
    for(let i = 0; i < str.length; i++)
        result += isLetter(str[i]) ? "_" : str[i]; 
        // Visualise any non-letter and replace letters with underscores

    return result;
}

// Main guessing code
function handleGuess(event) {
    let guessInput = document.getElementById("guess").value.toUpperCase();

    if(event.key !== 'Enter')  return; // Only works for enter
    if(correctWord == null)    return; // If there is no correct word
    if(guessInput.length == 0) return; // If empty message
    if(!isLetter(guessInput))  return; // Checks if letter
    if(isUnlocked(guessInput)) return; // Checks if letter has already been guessed
    if(guessDisabled)          return; // If guess input is disabled

    let guessChar = guessInput[0];

    // Checks if char is in correct word and adds it if it is
    if (!checkIfCharInCorrectWord(guessChar)) {
        wrongGuesses++;

        // Updates image
        hangmanImg.src = "/assets/hangman/" + wrongGuesses + ".jpg";

        if (wrongGuesses >= wrongGuessesMax) {
            document.getElementById('title').textContent = 'You lost!';
            guessDisabled = true;
        }
    }

    // Adds char to already unlocked
    guessedChars.push(guessChar);
    updateGuessedCharsText();

    // Clears input field
    document.getElementById("guess").value = "";

    console.log(resultWord.join(""));
    console.log("Guesses left: " + wrongGuesses);

    document.getElementById("temp-result").textContent = resultWord.join("");

    // Checks if correct word has been guessed
    if (resultWord.join("") == correctWord) {
        document.getElementById('title').textContent = 'The correct word has been guessed!';
        guessDisabled = true;
    }
}

function checkIfCharInCorrectWord(char) {
    let inWord = false;

    for(let i = 0; i < resultWord.length; i++) {
        if(char == correctWord[i].toUpperCase()) {
            resultWord[i] = correctWord[i];
            inWord = true;
        }
    }

    return inWord;
}

// Checks if char has already been unlocked
function isUnlocked(char) {
    for(let i = 0; i < guessedChars.length; i++)
        if(char == guessedChars[i])
            return true;
    
    return false;
}

function updateGuessedCharsText() {
    let text = "Guessed letters:";

    guessedChars.sort();

    for(let i = 0; i < guessedChars.length; i++) 
        text += " " + guessedChars[i];
    
    document.getElementById("guessedLetters").textContent = text;
}