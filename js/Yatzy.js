let rolls = 3;
// Current dice values
let currentValues = new Array(5)

let player1Scores=[
    0,  // Reserved, 0
    0,  // Ones, 1
    0,  // Twos, 2
    0,  // Threes, 3
    0,  // Fours, 4
    0,  // Fives, 5
    0,  // Sixes, 6
    0,  // Sum of digits, 7
    0,  // Bonus, 8
    0,  // One pair, 9
    0,  // Two pairs, 10
    0,  // Three of a kind, 11
    0,  // Four of a kind, 12
    0,  // Full House, 13
    0,  // Small ladder, 14
    0,  // Big ladder, 15
    0,  // Chance, 16
    0,  // Yatzy, 17
    0,  // Total, 18
];

function RollAllDice() {
    // Rolls amount logic
    if (rolls <= 0) {
        rolls = 3;
    }

    let rolls_counter = document.getElementById("rolls-text")
    rolls_counter.textContent = "Rolls left: " + rolls;
    rolls--;

    // Rolling logic
    let die = document.getElementsByClassName("dice");
    for (let i = 0; i < die.length; i++) {
        let num = RollDice(die[i]);
        if (num != null)
            currentValues[i] = num;
    }

    /*
    currentValues.forEach(element => {
        alert(element);
    });
    */
}

function RollDice(image) {
    if (image.classList.contains("locked")) {
        image.classList.remove("locked");
        return null;
    }

    let num = Math.floor(Math.random() * 6) + 1;
    image.src = "/assets/yatzy/dice" + num + ".png";
    return num;
}

function LockDice(image) {
    if (image.classList.contains("locked")) {
        image.classList.remove("locked");
    } else {
        image.classList.add("locked");
    }
}

// Scores
function CheckForDigit(digit, button) {
    if(LockedScore(button)) return;

    let result = 0;
    currentValues.forEach(element => {
        if (element == digit)
            result += digit;
    });

    player1Scores[digit] = result;
    button.textContent = result;

}

function CheckForPairs(pairAmount, button) {
    
}

function CheckForMultipleOfAKind(digit, button) {
    if(LockedScore(button)) return;

    currentValues.sort();

    let tempCounter = 1;
    let result = 0;

    // NEED TO FIX THIS
    for(let i = 0; i < currentValues.length -1; i++) 
    {
        if (currentValues[i] == currentValues[i+1]) 
        {
            tempCounter++;
            if (tempCounter == digit) 
            {
                result = currentValues[i] * digit;
                break;
            }
        } 
        else
            tempCounter = 1;
    }

    player1Scores[digit + 8] = result;
    button.textContent = result;
}

function CheckForLadder(startDigit, button)
{
    if(LockedScore(button)) return;

    currentValues.sort();

    let temp = 0;
    let result = 0;

    for(let i = 0; i < currentValues.length; i++) {
        if (currentValues[i] > temp) {
            temp = currentValues[i];
            result += temp;
        } else {
            result = 0;
            break;
        }
    }

    player1Scores[startDigit + 13] = result;
    button.textContent = result;
}

function LockedScore(button) {
    if (button.classList.contains("lockedScore"))
        return true;
    button.classList.add("lockedScore");
    return false;
}
