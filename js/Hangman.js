let allowedChars = ['.', ',', ' ', ':', ';', '?', '!'];
let guessedChars =[];

let wrongGuesses = 7;

let correctWord = "Hol up";
let resultWord = hideString(correctWord).split("");

document.getElementById("temp-result").textContent = resultWord.join("");

function handleGuess(event) {
   // Only works for enter
    if(event.key !== 'Enter')
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

// Return true if letter/ false if not
function isLetter(char) {
    return (char.length === 1) && (char >= 'A' && char <= 'Z');
}

// Checks if char has already been unlocked
function isUnlocked(char) {
    for(let i = 0; i < guessedChars.length; i++)
        if(char == guessedChars[i])
            return true;
    
    return false;
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