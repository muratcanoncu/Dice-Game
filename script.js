"use strict";
// Buttons
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let btnNewGame = document.querySelector(".btn--new");
// display of Dice you get
let diceImg = document.querySelector(".dice");
diceImg.classList.add("hidden");
// player 1 buttons
let player1Section = document.querySelector(".player--0");
let score1 = document.querySelector("#score--0");
score1.textContent = 0;
let currentScore1 = document.querySelector("#current--0");

// player 2 buttons
let player2Section = document.querySelector(".player--1");
let score2 = document.querySelector("#score--1");
score2.textContent = 0;
let currentScore2 = document.querySelector("#current--1");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

function initialization() {
  playing = true;
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");
  diceImg.classList.add("hidden");
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
}

//! New game Button
btnNewGame.addEventListener("click", initialization);

function switchPlayer() {
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Change Player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Section.classList.toggle("player--active");
  player2Section.classList.toggle("player--active");
}

//! Rolling Button
btnRoll.addEventListener("click", function () {
  if (playing) {
    diceImg.classList.remove("hidden");
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `./dice-${dice}.png`;
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch to next player
      scores[activePlayer] += currentScore;
      switchPlayer();
    }
  }
});

//! Holding Button
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      diceImg.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});
