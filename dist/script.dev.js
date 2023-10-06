'use strict'; // selecting elements

var score0El = document.querySelector("#score--0");
var score1El = document.getElementById("score--1");
var current0El = document.getElementById("current--0");
var current1El = document.getElementById("current--1");
var diceEl = document.querySelector(".dice");
var btnNew = document.querySelector(".btn--new");
var btnRoll = document.querySelector(".btn--roll");
var btnHold = document.querySelector(".btn--hold"); // individual section elements

var player0El = document.querySelector(".player--0");
var player1El = document.querySelector(".player--1"); // setting elements values in the DOM

var scores = [0, 0];
var activePlayer = 0;
var currentScore = 0;
var playing = true;

var initializeGame = function initializeGame() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  var allScores = document.querySelectorAll(".score");

  for (var i = 0; i < allScores.length; i++) {
    allScores[i].textContent = 0;
  } // 2. hide the dice


  diceEl.classList.add("hidden"); // 3. set game status to true

  playing = true; // storing state of the game
  // 4. remove the player--winner class from the winner

  document.querySelector(".player--".concat(activePlayer)).classList.remove("player--winner"); // 5. remove active player from current player

  document.querySelector(".player--".concat(activePlayer)).classList.remove("player--active"); // 6. Make first player the active player

  activePlayer = 0;
  currentScore = 0;
  document.querySelector(".player--".concat(activePlayer)).classList.add("player--active"); // 7. reset all scores to zero

  for (var _i = 0; _i < scores.length; _i++) {
    scores[_i] = 0;
    document.getElementById("current--".concat(_i)).textContent = activePlayer;
  }
}; // end fxn initializeGames
// at page reload, refresh or New game, start game with initial values


initializeGame(); // function to switch player

var switchPlayer = function switchPlayer() {
  document.getElementById("current--".concat(activePlayer)).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // switch the active player

  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}; // hiding the middle dice at start of game


diceEl.classList.add("hidden"); // implementing roll dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    var dice = Math.trunc(Math.random() * 6) + 1; // 2. display the dice

    diceEl.classList.remove("hidden");
    diceEl.src = "dice-".concat(dice, ".png"); // 3. switch the active elements

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById("current--".concat(activePlayer)).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}); // holding the current score for the current player

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. hold the current score in the global variable
    // and display it in the total score section
    scores[activePlayer] += currentScore;
    document.getElementById("score--".concat(activePlayer)).textContent = scores[activePlayer]; // 2. Check if total score is >= 20

    if (scores[activePlayer] >= 20) {
      diceEl.classList.add("hidden");
      playing = false;
      document.querySelector(".player--".concat(activePlayer)).classList.add("player--winner");
      document.querySelector(".player--".concat(activePlayer)).classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
}); // reseting the game

btnNew.addEventListener("click", initializeGame);