let rolls = 3;

function rollAllDice() {
    let die = document.getElementsByClassName("dice");
    if (rolls <= 0) {
        rolls = 3;
    }

    for (let i = 0; i < die.length; i++) {
        RollDice(die[i]);
    }
    rolls--;
}

function RollDice(image) {
    if (image.classList.contains("locked")) {
        image.classList.remove("locked");
        return;
    }

    let num = Math.floor(Math.random() * 6) + 1;
    image.src = "assets/dice" + num + ".png";
}

function LockDice(image) {
    if (image.classList.contains("locked")) {
        image.classList.remove("locked");
    } else {
        image.classList.add("locked");
    }
}