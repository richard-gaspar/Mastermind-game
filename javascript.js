"use strict";

const body = document.querySelector("body");
const newGame = document.querySelector(".btn");
const gameRulesBtn = document.querySelector(".game-rules-btn");
const gameRules = document.querySelector(".game-rules");
const closeBtn = document.querySelector(".close-btn");
const overlay = document.querySelector(".overlay");
const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");

// Make the table in DOM

const makeDivs = function () {
  for (let i = 0; i < 10; i++) {
    let div = document.createElement("div");
    div.className = "guess-box";

    leftSide.appendChild(div);
  }

  const guessBox = document.querySelectorAll(".guess-box");

  guessBox.forEach((element) => {
    for (let i = 0; i < 4; i++) {
      let circle = document.createElement("div");
      circle.className = "guess-dots";

      element.appendChild(circle);
    }
  });

  for (let i = 0; i < 10; i++) {
    let div2 = document.createElement("div");
    div2.className = "check-box";

    rightSide.appendChild(div2);
  }

  const checkBox = document.querySelectorAll(".check-box");

  checkBox.forEach((element) => {
    for (let i = 0; i < 4; i++) {
      let circle = document.createElement("div");
      circle.className = "check-dots";

      element.appendChild(circle);
    }
  });
};

makeDivs();
// Select colors for clickevent

// Game rules modal
const closeModal = function () {
  gameRules.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !gameRules.classList.contains("hidden")) {
    closeModal();
  }
});

// *********** How can i add only once the HTML ************ //
gameRulesBtn.addEventListener("click", function () {
  gameRules.classList.remove("hidden");
  overlay.classList.remove("hidden");
  gameRules.insertAdjacentHTML(
    "beforeend",
    `<h2>MasterMind game rules</h2>
  <p>
    The computer has selected a secret combination of 4 colored
    circles and you have to guess that combination in 10 or fewer
    tries to win.
  </p>
  <h3>How to play . . .</h3>
  <p>
    To create your guess click each apparent colored circle until
    you've filled the row with your combination (you can delete your
    guess by clicking "delete" button). Then click the "check my
    guess" button. Each time you submit a guess the machine will use
    score circles to let you know how close that guess is. For each
    guess a black score circle indicates that one of your circle is
    the right color in the right position. A white score circle
    indicates that one of your circles is the right color in the wrong
    position. Use the score to guide your next guess. If your guess
    scores 4 black score cirlces within 10 tries, you win. To begin a
    new game click the "new game" button. Good luck!
  </p>`
  );
});
