let player1Active = true;
let counter = 0;
let currentStatus = Array(9).fill(0);

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

function handleBoxPressed(button, CSIndex) {
    if (button.classList.contains("lockedButton") || currentStatus[CSIndex] > 0) return;
    button.classList.add("lockedButton");
    
    currentStatus[CSIndex] = player1Active ? 1 : 2;
    button.textContent = player1Active ? "X" : "O";
    counter++;
    
    let gameOver = false;
    for(let pattern of winPatterns)
        if(currentStatus[pattern[0]] == currentStatus[pattern[1]] && currentStatus[pattern[1]] == currentStatus[pattern[2]] && currentStatus[pattern[0]] > 0) {
            gameOver = true;
            break;
        }
    
    if(gameOver || counter >= 9) {
        alert(gameOver ? `Player ${player1Active ? 1 : 2} won` : "It's a draw!");
        reset();
    } else 
        player1Active = !player1Active;
}

function reset() {
    document.querySelectorAll(".box").forEach(button => {
        button.classList.remove("lockedButton");
        button.textContent = "";
    });
    
    currentStatus.fill(0);
    counter = 0;
    player1Active = true;
}