const currentWord = document.getElementById("current-word");
const inputBox = document.getElementById("input");
const resultBtn = document.getElementById("result-btn");
const selectList = document.getElementById("select-list");
const startGameBtn = document.getElementById("start-btn");
const highScorePlaceholder = document.getElementById("highscore");
const durationPlaceholder = document.querySelector('.time');
const highScore = localStorage.getItem('high_score') || 0;

highScorePlaceholder.innerText = highScore;

// state of the game
const state = { isPlaying: false, score: 0, duration: 0, words: [], wrongWords: 0 };

function init() {
  let duration = +selectList.options[selectList.selectedIndex].innerText.split(" ")[0] * 60;


  // fetch the words
  fetch('../data/words.json')
    .then(res => res.json())
    .then(words => {
      state.duration = duration;
      state.isPlaying = true;
      state.words = words;

      durationPlaceholder.innerText = `${state.duration}s`;
      startGame();
    });
}


function startGame() {

  startGameBtn.style.display = 'none';

  // focus to the input box
  inputBox.focus();

  // load a random word
  loadWord();

  // start the count down
  setInterval(countDown, 1000);

}

function countDown() {
  if (state.duration >= 0 && state.isPlaying) {
    state.duration -= 1;

    if (state.duration === 0) {
      inputBox.disabled = true;
    }

  } else {
    state.isPlaying = false;
    resultBtn.style.display = 'block';
  }

  durationPlaceholder.innerText = state.duration >= 0 ? `${state.duration}s` : "Game Over";
}

function loadWord() {
  if (state.isPlaying && state.duration > 0) {
    currentWord.innerText = state.words[Math.floor(Math.random() * state.words.length)];
  }
}


function checkStatus() {
  if (currentWord.innerText.length === inputBox.value.length) {
    if (currentWord.innerText === inputBox.value) {
      state.score += 1;
    } else {
      state.wrongWords += 1;
    }

    // clear the input box
    inputBox.value = '';
    loadWord();
  }
}

function showResults() {

  swal({
    title: 'Score',
    text: `Your score is ${state.score}. You have typed ${state.wrongWords} wrong words`,
    icon: 'success',
  }).then(() => {

    if (state.score > highScore) {
      swal({
        title: 'Would you like to save your High score?',
        icon: 'info',
        buttons: ['No', 'Yes']
      }).then(value => {

        if (value) {
          localStorage.setItem('high_score', state.score);
        }

      }).then(() => {

        swal({
          title: 'Success',
          text: 'Your score has been saved successfully!',
          icon: 'success'
        });

      });
    }

  });

}
startGameBtn.addEventListener('click', init);
inputBox.addEventListener('input', checkStatus);
resultBtn.addEventListener('click', showResults);