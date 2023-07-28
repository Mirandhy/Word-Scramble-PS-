const words = [
  { word: "mango", hint: "It's a tropical fruit." },
  { word: "elephant", hint: "It's the largest land animal." },
  { word: "giraffe", hint: "It has a long neck." },
  { word: "panda", hint: "It's black and white." },
  { word: "koala", hint: "It's a marsupial from Australia." },
  { word: "zebra", hint: "It has black and white stripes." },
  { word: "boat", hint: "It sails." },
  { word: "spoon", hint: "You eat with it." },
  { word: "apple", hint: "Fall favorite for picking." },
  { word: "tiger", hint: "It's a fierce predator." },
];
/* reach for more random words such as list or pulling from internet*/

let currentRound = 0;
let triesLeft = 3;
const roundsToWin = 6;

const scrambledWordE = document.getElementById("scrambledWord");
const hintE = document.getElementById("hint");
const triesLeftE = document.getElementById("triesLeft");
const guessInputE = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const messageE = document.getElementById("message");
const startOverButton = document.getElementById("startOverButton");
const winMessage = document.getElementById("winMessage");

const titleM = document.querySelector('h1');
titleM.style.color = 'purple';
hintE.style.color = 'purple';
triesLeftE.style.color = 'red';
guessButton.style.color = 'green';

function scrambleWord(word) {
  let scrambled = word.split("").sort(() => Math.random() - 0.5).join("");
  return scrambled;
} /*scramble words */

function displayScrambledWord() {
  let currentWord = words[currentRound];
  let scrambledWord = scrambleWord(currentWord.word);
  scrambledWordE.textContent = scrambledWord;
  hintE.textContent = `Hint: ${currentWord.hint}`;
  scrambledWordE.style.color = 'red';
}

function startRound() {
  winMessage.style.display = "none"; /* Hide "Smarty!" for rounds */
  if (currentRound < words.length) {
    displayScrambledWord();
    guessButton.disabled = false;
    guessInputE.value = "";
    messageE.textContent = "";
    triesLeft = 3;
    triesLeftE.textContent = triesLeft;
    startOverButton.disabled = true;
  } else {
    /*Player wins*/
    winMessage.style.display = "block"; /* Show "Smarty!" when won */
    guessButton.disabled = true;
    guessInputE.disabled = true;
    startOverButton.disabled = false;
  }
}

function checkGuess() {
  let currentWord = words[currentRound];
  let guess = guessInputE.value.trim().toLowerCase();
  if (guess === currentWord.word) {
    /* Right answer */
    messageE.textContent = "Correct!";
    setTimeout(() => {
      messageE.textContent = ""; /* Clear after  delay*/
      currentRound++;

      if (currentRound >= roundsToWin) {
        /* Player wins after 6 tries */
        winMessage.style.display = "block";
        guessButton.disabled = true;
        guessInputE.disabled = true;
        startOverButton.disabled = false;
      } else {
        /*Move to the next round */
        startRound();
      }
    }, 1000); /* Display "Correct! one sec" */
  } else {
    triesLeft--;
    triesLeftE.textContent = triesLeft;
    if (triesLeft <= 0) {
      messageE.textContent = "Game Over! Try again!";
      guessButton.disabled = true;
      startOverButton.disabled = false;
    } else {
      messageE.textContent = "Ooops! Try again.";
    }
  }
}

function startOver() {
  currentRound = 0;
  winMessage.style.display = "none";
  startRound();
}

guessButton.addEventListener("click", checkGuess);
startOverButton.addEventListener("click", startOver);

startRound();