// Grabbing Elements

let guessInput = document.getElementById("guess-input");
let submitBtn = document.getElementById("submit-btn");
let guessStatus = document.getElementById("guess-status");
let chances = document.getElementById("chances");
let startNewGame = document.getElementById("start-new-game");
let userLimit = 10;
chances.innerHTML = `${userLimit} chances remain`;

// guessInput.focus();

// cpu guess

let cpuGuess = Math.floor(Math.random() * 100 + 1);

// start game

startNewGame.addEventListener("click", () => {
  window.location.reload(true);
});
guessInput.addEventListener("change", saveUserValue);
submitBtn.addEventListener("click", checkGuess);
guessInput.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    checkGuess();
  }
});

// functions

function saveUserValue() {
  userGuess = guessInput.value;
}

function checkGuess() {
// check if the input is empty
  if (guessInput.value === "") {
    guessStatus.innerHTML = "please fill the input!";
    setTimeout(() => {
      guessStatus.innerHTML = "guess a number";
    }, 2000);
    return;
  }
  guessInput.value = null;
// show the chances that user have
  userLimit -= 1;
  chances.innerHTML = `${userLimit} chances remain`;
// if user lost the game
  if (userLimit === 0) {
    guessStatus.innerHTML = `you lost! <br> the number was ${cpuGuess}`;
    submitBtn.disabled = true;
    guessInput.disabled = true;
    startNewGame.style.display = "block";
  } else {
// if user won the game
    if (userGuess == cpuGuess) {
      guessStatus.innerHTML = `congratulations! you won with ${
        10 - userLimit
      } gusses`;
      submitBtn.disabled = true;
      guessInput.disabled = true;
      startNewGame.style.display = "block";
    } else 
// guide user to guess better
	if (userGuess < cpuGuess + 5 && userGuess > cpuGuess) {
      guessStatus.innerHTML = "your guess is a bit high";
    } else if (userGuess > cpuGuess - 5 && userGuess < cpuGuess) {
      guessStatus.innerHTML = "your guess is a bit low";
    } else if (userGuess < cpuGuess + 15 && userGuess > cpuGuess) {
      guessStatus.innerHTML =
        "your guess is higher , but you are about to get it";
    } else if (userGuess < cpuGuess - 15 && userGuess > cpuGuess) {
      guessStatus.innerHTML =
        "your guess is lower , but you are about to get it";
    } else if (userGuess < cpuGuess) {
      guessStatus.innerHTML = "your guess is alot lower";
    } else if (userGuess > cpuGuess) {
      guessStatus.innerHTML = "your guess is alot higher";
    }
  }
// show user his/her last guess
  let pTag = document.createElement("p");
  let pContent = document.createTextNode(
    `your previous guess is : ${userGuess}`
  );
  pTag.appendChild(pContent);
  let previousGuess = document.getElementById("previous-guess");
  let oldText = document.getElementById("old-text");
  oldText.style.display = "none";
  previousGuess.appendChild(pTag);
}
