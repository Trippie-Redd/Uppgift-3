let allowedChars = ['.', ',', ' ', "'", ':', ';', '?', '!'];
let guessedChars = [];

let wrongGuessesMax = 7;
let wrongGuesses = wrongGuessesMax;

let correctWord;
let resultWord;

// Main code for making a new guess word
function getInput(event) {
    if (event.key !== 'Enter')
        return;

    let input = document.getElementById("wordInput").value;
    let inputArr = input.toUpperCase().split("");

    // Returns if not a valid word
    for(let i = 0; i < inputArr.length; i++) {
        if (!isLetterOrExclusion(inputArr[i])) {
            return;
        }
    }

    correctWord = input;

    resultWord = hideString(correctWord).split("");
    document.getElementById("temp-result").textContent = resultWord.join("");

    // Clears input field and guessed chars, resets guesses
    document.getElementById("wordInput").value = "";
    guessedChars = [];
    wrongGuesses = wrongGuessesMax;
}

// Return true if letter or in allowedChars/ false if not
function isLetterOrExclusion(char) {
    for(let i = 0; i < allowedChars.length; i++) 
        if (char == allowedChars[i]) 
            return true;
        
    return isLetter(char);
}

// Return true if letter/ false if not
function isLetter(char) {
    return (char.length === 1) && (char >= 'A' && char <= 'Z');
}

// Returns a hidden string
function hideString(str) {
    let result = "";

    // Replace all letters
    for(let i = 0; i < str.length; i++) {
        let charDefined = false;

        // Checks for any allowed chars
        for(let j = 0; j < allowedChars.length; j++) {
            if(str[i] == allowedChars[j]) {
                result += str[i];
                charDefined = true;
                break;
            }
        }
        
        // Replaces letters with underscores
        if (!charDefined)
            result += "_";
    }

    return result;
}

// Main guessing code
function handleGuess(event) {
    // Only works for enter
    if(event.key !== 'Enter')
        return;

    // If there is no correct wors
    if(correctWord == null)
        return;

    // Gets single char
    let guessInput = document.getElementById("guess").value.toUpperCase();
    let guessChar = guessInput[0];

    // Checks if letter
    if (!isLetter(guessChar))
        return;

    // Checks if letter has already been guessed
    if(isUnlocked(guessChar)) {
        return;
    }  

    // Checks if char is in correct word and adds it if it is
    if (!checkIfCharInCorrectWord(guessChar)) {
        wrongGuesses--;
        if (wrongGuesses <= 0)
            alert("You lost");
    }

    // Adds char to already unlocked
    guessedChars.push(guessChar);

    // Clears input field
    document.getElementById("guess").value = "";

    console.log(resultWord.join(""));
    console.log("Guesses left: " + wrongGuesses);

    document.getElementById("temp-result").textContent = resultWord.join("");

    // Checks if correct word has been guessed
    if (resultWord.join("") == correctWord)
        alert("Correct word has been guessed!");
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