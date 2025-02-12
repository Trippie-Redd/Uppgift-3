let maxRolls = 3;
let rolls = maxRolls;

let currentValues = new Array(5);

let p1Active = true;

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

RollAllDice();

function RollAllDice() {
    // If all rolls have been used
    if (rolls < 0) {return;}

    let rolls_counter = document.getElementById("rolls-text")
    rolls_counter.textContent = "Rolls Left: " + rolls;
    rolls--;

    // Rolling logic
    let die = document.getElementsByClassName("dice");
    for (let i = 0; i < die.length; i++) {
        let num = RollDice(die[i]);
        if (num != null)
            currentValues[i] = num;
    }
}

function RollDice(image) {
    if (image.classList.contains("locked")) {
        //image.classList.remove("locked");
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
    } else {
        AddToSum(result, button, false);
    }
}

// Done
function CheckForFullHouse(button) {
    if(LockedScore(button)) return;

    currentValues.sort();

    let result = 0;

    // Just check ts
    if (currentValues[0] == currentValues[1] && currentValues[1] == currentValues[2] && currentValues[3] == currentValues[4] || currentValues[0] == currentValues[1] && currentValues[2] == currentValues[3] && currentValues[3] == currentValues[4]) 
        currentValues.forEach(element => {
            result += element;
        });
    
    AddToSum(result, button, false);
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
}

// Done
function CheckChance(button) {
    if(LockedScore(button)) return;
    
    let result = 0;

    currentValues.forEach(element => {
        result += element;
    });

    AddToSum(result, button, false);;
}

// Done
function LockedScore(button) {
    if (button.classList.contains("lockedScore"))
        return true;
    else if (button.classList.contains("p1") && !p1Active || button.classList.contains("p2") && p1Active)
        return true;
    button.classList.add("lockedScore");
    return false;
}

function AddToSum(score, button, upperSquare) {
    // Makes the button an X if 0 else score
    if (score == 0) button.textContent = "X";
    else button.textContent = score;
   
    if (p1Active) {
        if(upperSquare) {
            p1DigitTotal += score;
            document.getElementById("p1DigitTotal").textContent = p1DigitTotal;
            p1DigitCounter++;
            if (p1DigitCounter >= 6) {
                if(p1DigitTotal >= 63) {
                    p1Total += 50;
                    document.getElementById("p1Bonus").textContent = 50;
                } else {
                    document.getElementById("p1Bonus").textContent = "X";
                }
            }
        }

        p1Total += score;
    
        document.getElementById("p1Total").textContent = p1Total;

        p1TotalCounter++;
    } else {
        if(upperSquare) {
            p2DigitTotal += score;
            document.getElementById("p2DigitTotal").textContent = p2DigitTotal;
            p2DigitCounter++;
            if (p2DigitCounter >= 6) {
                if(p2DigitTotal >= 63) {
                    p2Total += 50;
                    document.getElementById("p2Bonus").textContent = 50;
                } else {
                    document.getElementById("p2Bonus").textContent = "X";
                }
            }
        }

        p2Total += score;
    
        document.getElementById("p2Total").textContent = p2Total;

        p2TotalCounter++;
    }

    p1Active = !p1Active;

    // Changes player active header text
    if (p1Active)
        document.getElementById("playerActive").textContent = "Player 1's turn";
    else   
        document.getElementById("playerActive").textContent = "Player 2's turn";
    
    // Resets rolls after value assigned
    rolls = maxRolls;
    let rolls_counter = document.getElementById("rolls-text");
    rolls_counter.textContent = "Rolls Left: " + rolls;
    RollAllDice();

    // Ends game after last turn
    if (p2TotalCounter >= 15) {
        EndGame();
    }
}

function EndGame() {
    if (p1Total > p2Total)
        alert("Player 1 won!")
    else if (p1Total < p2Total)
        alert("Player 2 won!")
    else
        alert("You tied!")
}