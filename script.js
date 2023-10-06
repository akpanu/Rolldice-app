'use strict';

// selecting elements
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// individual section elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

// setting elements values in the DOM

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

const initializeGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  const allScores = document.querySelectorAll(`.score`);
  for (let i = 0; i < allScores.length; i++) {
    allScores[i].textContent = 0;
  }
  // 2. hide the dice
  diceEl.classList.add(`hidden`);

  // 3. set game status to true
  playing = true; // storing state of the game

  // 4. remove the player--winner class from the winner
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);

  // 5. remove active player from current player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--active`);

  // 6. Make first player the active player
  activePlayer = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add(`player--active`);

  // 7. reset all scores to zero
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document.getElementById(`current--${i}`).textContent = activePlayer;
  }
}; // end fxn initializeGames

// at page reload, refresh or New game, start game with initial values
initializeGame();

// function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // switch the active player
  currentScore = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// hiding the middle dice at start of game
diceEl.classList.add(`hidden`);

// implementing roll dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display the dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    // 3. switch the active elements
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// holding the current score for the current player
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. hold the current score in the global variable
    // and display it in the total score section
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if total score is >= 20
    if (scores[activePlayer] >= 20) {
      diceEl.classList.add(`hidden`);
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
});

// reseting the game
btnNew.addEventListener(`click`, initializeGame);
