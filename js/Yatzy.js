let rolls = 3;

let player1Scores={ 
    one:0, 
    two:0, 
    three:0,
    four:0,
    five:4,
    six:0
};

function RollAllDice() {
    alert(player1Scores.five);

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
        RollDice(die[i]);
    }
}

function RollDice(image) {
    if (image.classList.contains("locked")) {
        image.classList.remove("locked");
        return;
    }

    let num = Math.floor(Math.random() * 6) + 1;
    image.src = "/assets/yatzy/dice" + num + ".png";
}

function LockDice(image) {
    if (image.classList.contains("locked")) {
        image.classList.remove("locked");
    } else {
        image.classList.add("locked");
    }
}

// Scores

