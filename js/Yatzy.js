let rolls = 3;

let currentValues = new Array(5)

let playerActive = 1;

// Player 1 stats
let p1Total = 0;
let p1DigitTotal = 0;
let p1DigitCounter = 0;
let p1TotalCounter = 0;

// Player 2 stats
let p2Total = 0;
let p2DigitTotal = 0;
let p2DigitCounter = 0;
let p2TotalCounter = 0;

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
// Done
function CheckForDigit(digit, button) {
    if(LockedScore(button)) return;

    let result = 0;
    currentValues.forEach(element => {
        if (element == digit)
            result += digit;
    });

    AddToSum(result, button, true);
    button.textContent = result;
}

// Done
function CheckForPairs(pairAmount, button) {
    if (LockedScore(button)) return;

    // Using a hashmap
    let scoreMap = new Map();

    currentValues.forEach(element => {
        scoreMap.set(element, (scoreMap.get(element) || 0) + 1);
    });

    let result = 0;
    let pairsCounted = 0;

    // This is made by ChatGPT
    Array.from(scoreMap.keys()).sort((a, b) => b - a).forEach(key => {
        if (pairsCounted >= pairAmount) return; // Stop if enough pairs found

        if (scoreMap.get(key) >= 2) {
            result += key * 2;
            pairsCounted++;
        }
    });

    AddToSum(result, button, false);
    button.textContent = result;
}

// Done
function CheckForMultipleOfAKind(digit, button) {
    if(LockedScore(button)) return;

    currentValues.sort();

    let tempCounter = 1;
    let result = 0;

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

    if (digit == 5 && result > 0) {
        AddToSum(50, button, false);;
        button.textContent = 50;
    } else {
        AddToSum(result, button, false);
        button.textContent = result;
    }
}

// Done
function CheckForFullHouse(button) {
    //if(LockedScore(button)) return;

    currentValues.sort();

    let result = 0;

    // Just check ts
    if (currentValues[0] == currentValues[1] && currentValues[1] == currentValues[2] && currentValues[3] == currentValues[4] || currentValues[0] == currentValues[1] && currentValues[2] == currentValues[3] && currentValues[3] == currentValues[4]) 
        currentValues.forEach(element => {
            result += element;
        });
    
    AddToSum(result, button, false);
    button.textContent = result;
}

// Done
function CheckForLadder(startDigit, button) {
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

    if (currentValues[0] != startDigit) {
        result = 0;
    }

    AddToSum(result, button, false);
    button.textContent = result;
}

// Done
function CheckChance(button) {
    if(LockedScore(button)) return;
    
    let result = 0;

    currentValues.forEach(element => {
        result += element;
    });

    AddToSum(result, button, false);;
    button.textContent = result;
}

// Done
// USE THIS FOR THE " PLAYER" SHIT
function LockedScore(button) {
    if (button.classList.contains("lockedScore"))
        return true;
    button.classList.add("lockedScore");
    return false;
}

function AddToSum(score, button, upperSquare) {
    button.textContent = score;

    if(upperSquare) {
        p1DigitTotal += score;
        document.getElementById("p1DigitTotal").textContent = p1DigitTotal;
        p1DigitCounter++;
        if (p1DigitCounter >= 6) {
            if(p1DigitTotal >= 63) {
                p1Total += 50;
                document.getElementById("p1Bonus").textContent = 50;
            } else {
                document.getElementById("p1Bonus").textContent = 0;
            }
        }
    }

    p1Total += score;
   
    document.getElementById("p1Total").textContent = p1Total;

    p1TotalCounter++;
    if (p1TotalCounter >= 15) {}
}