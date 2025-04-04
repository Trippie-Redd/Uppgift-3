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
    button.disabled = true;
    
    currentStatus[CSIndex] = player1Active ? 1 : 2;
    button.textContent = player1Active ? "x" : "o";
    counter++;
    
    let gameOver = false;
    for(let pattern of winPatterns)
        if(currentStatus[pattern[0]] == currentStatus[pattern[1]] && currentStatus[pattern[1]] == currentStatus[pattern[2]] && currentStatus[pattern[0]] > 0) {
            gameOver = true;
            break;
        }
    
    if(gameOver) {
        document.getElementById('title').textContent = player1Active ? 'Player 1 won!' : 'Player 2 won!';
        lockBoxes();
    } else if(counter >= 9) {
        document.getElementById('title').textContent = 'You tied!';
        lockBoxes();
    } else 
        player1Active = !player1Active;
}

function reset() {
    document.querySelectorAll(".input-box").forEach(button => {
        button.disabled = false;
        button.textContent = "";
    });
    
    currentStatus.fill(0);
    counter = 0;
    player1Active = true;
    document.getElementById('title').textContent = "Tic Tac Toe";
}

function lockBoxes() {
    document.querySelectorAll(".input-box").forEach(button => {
        button.disabled = true;
    });
}