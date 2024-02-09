let gameLevelArray = [];
let playerLevelArray = [];

function getRandomColor() {
  // Array of colors
  const colors = ["green", "red", "yellow", "blue"];

  // Generate a random index based on the length of the colors array
  const randomIndex = Math.floor(Math.random() * colors.length);

  // Return the color at the randomly selected index
  return colors[randomIndex];
}

function buttonClick(buttonColor) {
  document.querySelector("." + buttonColor).classList.add("pressed");

  new Audio("./sounds/" + buttonColor + ".mp3").play();

  setTimeout(function () {
    document.querySelector("." + buttonColor).classList.remove("pressed");
  }, 100);
}

function gameOver(correctButtonColor) {
  new Audio("./sounds/wrong.mp3").play();
  document.querySelectorAll(".btn").forEach(function (button) {
    button.classList.add("wrong");
  });

  gameLevelArray = [];
  playerLevelArray = [];
  updateLevelTitle("Press Any Color to Start Again");
}

function areArraysEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

function startGameSequence() {
  document.querySelectorAll(".btn").forEach(function (button) {
    button.classList.remove("wrong");
  });

  let newColor = getRandomColor();
  gameLevelArray.push(newColor);
  updateLevelTitle("Level " + gameLevelArray.length);
  buttonClick(newColor);
}

function updateLevelTitle(message) {
  document.querySelector("#level-title").innerHTML = message;
}

function levelUp() {
  let newColor = getRandomColor();
  gameLevelArray.push(newColor);

  for (let i = 0; i < gameLevelArray.length; i++) {
    setTimeout(function () {
      buttonClick(gameLevelArray[i]);
    }, 500 * (i + 1));
  }

  document.querySelector("#level-title").innerHTML =
    "Level " + gameLevelArray.length;
  playerLevelArray = [];
}

document.querySelectorAll(".btn").forEach(function (button) {
  button.addEventListener("click", function (event) {
    if (gameLevelArray.length != 0) {
      playerLevelArray.push(event.target.id);
      if (
        playerLevelArray[playerLevelArray.length - 1] ===
        gameLevelArray[playerLevelArray.length - 1]
      ) {
        buttonClick(event.target.id);
        if (playerLevelArray.length == gameLevelArray.length) {
          levelUp();
        }
      } else {
        gameOver(gameLevelArray[playerLevelArray.length - 1]);
      }
    } else {
      startGameSequence();
    }
  });
});
