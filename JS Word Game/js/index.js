"use strict";

let isPlaying = true;
let time = 120;
let correctWords = 0;
let wrongWords = 0;
let WPM;
let totalWords = -1;
let words = [];

// DOM Elements
const timeDisplay = document.querySelector(".time");
const resultButton = document.querySelector("#result-btn");
const input = document.querySelector("#input");
const current_word = document.querySelector("#current-word");
const confirm = document.querySelector(".swal-button--confirm");
const high_score = document.querySelector('#highscore');
const last_score = document.querySelector('#lastscore');

window.addEventListener("load", init);

async function init() {

  showGameInfo();

  // set current high score = 0
  localStorage.setItem('High Score', 0);

  // Load words from the Api
  await loadWords("./data/words.json").then(res => (words = res));

  // count Down functionality
  setInterval(countDown, 1000);

  // show the words
  showWords(words);

  // check status
  input.addEventListener("input", checkStatus);
}

function showGameInfo() {
  const storage = localStorage;

  if(storage['High Score']) {
    high_score.innerHTML = storage['High Score'];
  }

  if(storage['Last Score']) {
    last_score.innerHTML = storage['Last Score'];
  }


}

async function loadWords(URL) {
  const res = await fetch(URL);
  const data = await res.json();

  return data;
}

function showWords(words) {
  if (isPlaying && time > 0) {
    totalWords++;
    input.value = "";

    const randomIndex = Math.floor(Math.random() * words.length);

    current_word.innerHTML = words[randomIndex];
  }
}

function checkStatus() {
  if (this.value.length === current_word.innerHTML.length) {
    if (this.value === current_word.innerHTML) {
      correctWords++;
    } else {
      wrongWords++;
    }

    showWords(words);
  }
}

function countDown() {
  // Check if the game is going on

  if (time != 0 && isPlaying == true) {
    time--;
  } else {
    resultButton.disabled = false;
    input.disabled = true;
    isPlaying = false;
  }

  timeDisplay.innerHTML = time || "Game Over";
}

resultButton.addEventListener("click", e => {
  e.preventDefault();

  let title = 0;
  let icon = "";

  if (correctWords > totalWords - 10 && correctWords <= totalWords) {
    title = "Excellent!!!";
    icon = "success";
  } else if (
    correctWords >= totalWords / 2 &&
    correctWords <= totalWords - 10
  ) {
    title = "Nice Job!";
    icon = "success";
  } else if (correctWords < totalWords / 2) {
    title = "Need to improve!";
    icon = "error";
  }

  swal({
    title: title,
    icon: icon,
    text: `Total Words : ${totalWords}
     Correct Words Typed : ${correctWords}
     Wrong Words Typed : ${wrongWords}
     Your WPM : ${correctWords / 1} WPM`
  }).then(() => {
    swal({
      title: "Would you like to save your WPM ?",
      icon: "info",
      buttons: ["No", "Yes"]
    }).then(value => {
      if (value) {
        localStorage.setItem("Last Score", correctWords);

        swal({
          title: "Your WPM has been successfully saved!",
          icon: "success"
        });
      }
    });
  });
});
