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

// Select colors for clickevent
const secretColor1 = document.getElementById("secret-color-1");
const secretColor2 = document.getElementById("secret-color-2");
const secretColor3 = document.getElementById("secret-color-3");
const secretColor4 = document.getElementById("secret-color-4");

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

let secretColorArray = [
  {
    color: (secretColor1.id = colorsArray[Math.floor(Math.random() * 6)]),
    is: false,
  },
  {
    color: (secretColor2.id = colorsArray[Math.floor(Math.random() * 6)]),
    is: false,
  },
  {
    color: (secretColor3.id = colorsArray[Math.floor(Math.random() * 6)]),
    is: false,
  },
  {
    color: (secretColor4.id = colorsArray[Math.floor(Math.random() * 6)]),
    is: false,
  },
];

// let secretColorArray = [];

// const shuffleColors = function () {
//   secretColorArray.push(
//     (secretColor1.id = colorsArray[Math.floor(Math.random() * 6)]),
//     (secretColor2.id = colorsArray[Math.floor(Math.random() * 6)]),
//     (secretColor3.id = colorsArray[Math.floor(Math.random() * 6)]),
//     (secretColor4.id = colorsArray[Math.floor(Math.random() * 6)])
//   );
// };
// shuffleColors();

console.log(secretColor1.id, secretColor2.id, secretColor3.id, secretColor4.id);

const circles = document.querySelectorAll(".guess-dots");
const circlesArray = Array.from(circles);
const checkDots = document.querySelectorAll(".check-dots");
const checkDotsArray = Array.from(checkDots);

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

colors.forEach((colors) =>
  colors.addEventListener("click", function () {
    if (!activeRow.some((element) => element.style.backgroundColor === ""))
      return;
    const color = colors.getAttribute("data-color");
    console.log(color);
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

// activeCheck[
//   activeCheck.findIndex((element) => (element.style.backgroundColor = ""))
// ].style.backgroundColor = "black";

//////// BUG =====> Ha egy szín jó helyen van, akkor is fehér pöttyöt rak ha egy ugyanolyan színt pakolok bele 2.nak

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

// const inventory = [
//   { position: 1, is: false },
//   { position: 2, is: false },
//   { position: 3, is: false },
//   { position: 4, is: false },
// ];

const checkElement = function (index) {
  if (
    activeRow[index].style.backgroundColor === secretColorArray[index].color
  ) {
    pegsOrder.push("black");
    secretColorArray[index].is = true;
  } else if (
    secretColorArray[0].color === activeRow[index].style.backgroundColor &&
    secretColorArray[0].is === false
  ) {
    secretColorArray[0].is === true;
    pegsOrder.push("white");
    console.log(secretColorArray, "ELSŐ");
  } else if (
    secretColorArray[1].color === activeRow[index].style.backgroundColor &&
    secretColorArray[1].is === false
  ) {
    secretColorArray[1].is === true;
    pegsOrder.push("white");
    console.log(secretColorArray, "MÁSODIK");
  } else if (
    secretColorArray[2].color === activeRow[index].style.backgroundColor &&
    secretColorArray[2].is === false
  ) {
    secretColorArray[2].is === true;
    pegsOrder.push("white");
    console.log(secretColorArray, "HARMADIK");
  } else if (
    secretColorArray[3].color === activeRow[index].style.backgroundColor &&
    secretColorArray[3].is === false
  ) {
    secretColorArray[2].is === true;
    pegsOrder.push("white");
    console.log(secretColorArray, "NEGYEDIK");
  }
  secretColorArray[0].is = false;
  secretColorArray[1].is = false;
  secretColorArray[2].is = false;
  secretColorArray[3].is = false;
};

// should make an error if dots not filled all the way
checkMyGuess.addEventListener("click", function () {
  if (activeRow.some((element) => element.style.backgroundColor === "")) {
    alert("You need to fill all dots");
    return;
  }
  checkElement(0);
  checkElement(1);
  checkElement(2);
  checkElement(3);

  pegOrderFunction();
  // console.log(pegsOrder);
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
  console.log(activeRow[3].style.backgroundColor);
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

  console.log("haho");
});
