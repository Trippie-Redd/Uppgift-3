let player1Active = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let currentStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function handleBoxPressed(button, CSIndex) {
    if(lockedButton(button, CSIndex))
        return;

    if(player1Active) {
        currentStatus[CSIndex] = 1;
        button.textContent = "X";
    } else {
        currentStatus[CSIndex] = 2;
        button.textContent = "O";
    }

    if(!CheckIfWin())
        return; 
    
    if(player1Active)
        alert("Player 1 won");
    else
        alert("Player 2 won");
    
    player1Active = !player1Active;
}

function lockedButton(button, CSIndex) {
    if (button.classList.contains("lockedButton"))
        return true;
    else if (currentStatus[CSIndex] > 0)
        return true;
    button.classList.add("lockedButton");
    return false;
}

function CheckIfWin() {
    for(let pattern of winPatterns) {
        let num1 = pattern[0];
        let num2 = pattern[1];
        let num3 = pattern[2];

        if(currentStatus[num1] == currentStatus[num2] && currentStatus[num2] == currentStatus[num3] && currentStatus[num1] > 0)
            return true;
    }
    
    console.log("Not won");
    return false;
}

function reset() {
    let lockedButtons = document.getElementsByClassName("lockedButton");

    for(let i = 0; i < lockedButtons.length; i++) {
        lockedButtons[i].classList.remove("lockedButton");
        lockedButtons[i].textContent = "";
    }

    for(let i = 0; i < currentStatus.length; i++)
        currentStatus[i] = 0;
}