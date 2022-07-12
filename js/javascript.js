"use strict";

const body = document.querySelector("body");
const newGame = document.querySelector(".new-game-btn");
const gameRulesBtn = document.querySelector(".game-rules-btn");
const gameRules = document.querySelector(".game-rules");
const victoryModal = document.querySelector(".victory-modal");
const loseModal = document.querySelector(".lose-modal");
const checkMyGuess = document.querySelector(".check-my-guess");
const closeBtn = document.querySelector(".close-btn");
const closeVictoryBtn = document.querySelector(".close-victory-btn");
const closeLoseBtn = document.querySelector(".close-lose-btn");
const deleteBtn = document.querySelector(".delete-btn");
const current = document.querySelector(".current");

const overlay = document.querySelector(".overlay");

// Game rules modal
const closeModal = function () {
  gameRules.classList.add("hidden");
  victoryModal.classList.add("hidden");
  loseModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Escape" && !gameRules.classList.contains("hidden")) ||
    (e.key === "Escape" && !victoryModal.classList.contains("hidden")) ||
    (e.key === "Escape" && !loseModal.classList.contains("hidden"))
  ) {
    closeModal();
  }
});

gameRulesBtn.addEventListener("click", function () {
  gameRules.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

// Make the table in DOM
// ******** LATER WOULD LIKE TO MAKE A MODULE ******* //
const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");

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

// Secret color randomization when page loaded and when clicking new game button

const colors = document.querySelectorAll(".colors");
const colorArray = Array.from(colors);
const colorsArray = [];
for (let i = 0; i < colorArray.length; i++) {
  colorsArray.push(colorArray[i].dataset.color);
}

let secretColorArray = [];

const shuffleColors = function () {
  secretColorArray.push(
    {
      color: colorsArray[Math.floor(Math.random() * 6)],
      found: false,
    },
    {
      color: colorsArray[Math.floor(Math.random() * 6)],
      found: false,
    },
    {
      color: colorsArray[Math.floor(Math.random() * 6)],
      found: false,
    },
    {
      color: colorsArray[Math.floor(Math.random() * 6)],
      found: false,
    }
  );
};

shuffleColors();
// console.log(secretColor1.id, secretColor2.id, secretColor3.id, secretColor4.id);

let circles = document.querySelectorAll(".guess-dots");
let circlesArray = Array.from(circles);
let checkDots = document.querySelectorAll(".check-dots");
let checkDotsArray = Array.from(checkDots);

let activeRow;
let activeCheck;

const makeActiveRow = function () {
  return (
    (activeRow = circlesArray.splice(0, 4)),
    (activeCheck = checkDotsArray.splice(0, 4))
  );
};

const makeActiveDot = function () {
  if (activeRow.find((element) => element.style.backgroundColor === ""))
    activeRow
      .find((element) => element.style.backgroundColor === "")
      .classList.add("current");
};
const deleteActiveDot = function () {
  // if (activeRow[3].classList.contains("current")) {
  //   activeRow[3].classList.remove("current");
  //   return;
  // }
  activeRow
    .find((element) => element.classList.contains("current"))
    .classList.remove("current");
};

makeActiveRow();
makeActiveDot();

let pegsOrder = [];

const pegOrderFunction = function () {
  let order = { black: 1, white: 2 };
  pegsOrder.sort(
    (a, b) =>
      (order[a] || order.default) - (order[b] || order.default) ||
      a > b ||
      -(a < b)
  );

  activeCheck[0].style.backgroundColor = `${pegsOrder[0]}`;
  activeCheck[1].style.backgroundColor = `${pegsOrder[1]}`;
  activeCheck[2].style.backgroundColor = `${pegsOrder[2]}`;
  activeCheck[3].style.backgroundColor = `${pegsOrder[3]}`;
};

const checkElement = function () {
  // debugger;
  activeRow.forEach((element, index) => {
    if (element.style.backgroundColor === secretColorArray[index].color) {
      secretColorArray[index].found = true;
      pegsOrder.push("black");
    }
  });

  activeRow.forEach((element, index) => {
    if (
      element.style.backgroundColor !== secretColorArray[index].color &&
      secretColorArray.some(
        (el) => el.color === element.style.backgroundColor && el.found !== true
      )
    ) {
      secretColorArray.find(
        (el) => el.color === element.style.backgroundColor && el.found !== true
      ).found = true;
      pegsOrder.push("white");
    }
  });
  secretColorArray[0].found = false;
  secretColorArray[1].found = false;
  secretColorArray[2].found = false;
  secretColorArray[3].found = false;
};

checkMyGuess.addEventListener("click", function () {
  if (activeRow.some((element) => element.style.backgroundColor === "")) {
    alert("You need to fill all dots");
    return;
  }
  checkElement();

  pegOrderFunction();

  // Win game condition
  if (
    activeRow[0].style.backgroundColor === secretColorArray[0].color &&
    activeRow[1].style.backgroundColor === secretColorArray[1].color &&
    activeRow[2].style.backgroundColor === secretColorArray[2].color &&
    activeRow[3].style.backgroundColor === secretColorArray[3].color
  ) {
    victoryModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    closeVictoryBtn.addEventListener("click", closeModal);
  } else {
    makeActiveRow();
  }

  // console.log(inventory);
  makeActiveDot();
  pegsOrder.splice(0);

  // Lose game condition
  if (activeRow.length < 1) {
    loseModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    closeLoseBtn.addEventListener("click", closeModal);
  }
});

const ff = [1, 2, 3, 4, 5];

const deleteColor = function () {
  activeRow
    .map((x) => x)
    .reverse()
    .find(
      (element) => element.style.backgroundColor !== ""
    ).style.backgroundColor = "";
};

// Last dot bug
deleteBtn.addEventListener("click", function () {
  deleteColor();
  if (activeRow[3].style.backgroundColor === "") {
    makeActiveDot();
  }
  if (activeRow[2].style.backgroundColor === "") {
    activeRow
      .map((x) => x)
      .reverse()
      .find((element) => element.classList.contains("current"))
      .classList.remove("current");
  }
});

newGame.addEventListener("click", function () {
  while (leftSide.firstChild) {
    leftSide.removeChild(leftSide.firstChild);
  }
  while (rightSide.firstChild) {
    rightSide.removeChild(rightSide.firstChild);
  }

  secretColorArray = [];
  makeDivs();
  shuffleColors();

  circles = document.querySelectorAll(".guess-dots");
  circlesArray = Array.from(circles);
  checkDots = document.querySelectorAll(".check-dots");
  checkDotsArray = Array.from(checkDots);

  makeActiveRow();
  makeActiveDot();
});

colors.forEach((colors) =>
  colors.addEventListener("click", function () {
    if (!activeRow.some((element) => element.style.backgroundColor === ""))
      return;
    const color = colors.getAttribute("data-color");
    if (activeRow[0].style.backgroundColor === "") {
      activeRow[0].style.backgroundColor = `${color}`;
    } else if (activeRow[1].style.backgroundColor === "") {
      activeRow[1].style.backgroundColor = `${color}`;
    } else if (activeRow[2].style.backgroundColor === "") {
      activeRow[2].style.backgroundColor = `${color}`;
    } else if (activeRow[3].style.backgroundColor === "") {
      activeRow[3].style.backgroundColor = `${color}`;
    }

    deleteActiveDot();
    makeActiveDot();
  })
);

console.log(secretColorArray);
