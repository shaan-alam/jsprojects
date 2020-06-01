const colorBlocks = document.querySelectorAll('.color-block');
const changeColorBtn = document.querySelectorAll("#change-color");
const copyBtn = document.querySelectorAll("#copy-btn");
const locks = document.querySelectorAll(".lock i");
const mixBtn = document.querySelector("#mix-btn");
const saveBtn = document.querySelector('#save-btn');
const alert = document.querySelector('.success-msg-hide');
const BG = document.querySelector('.bg');
const modal = document.querySelector('.bg .modal');
const closeModal = document.querySelector(".bg .modal .close");
const palletteInputName = document.querySelector("#pallette-name");
const savePalletteBtn = document.querySelector('#save-pallette');
const showcaseDivs = document.querySelectorAll('.showcase div');

function init() {
  colorBlocks.forEach(block => chanegBlockColor(block));
}

function generateColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function changeBackgroundColor(e) {
  if (e.target.nextElementSibling.nextElementSibling.children[0].getAttribute('data-locked') === 'false') {
    chanegBlockColor(e.target.parentElement);
  }
}

function chanegBlockColor(block) {
  if (block.children[3].children[0].getAttribute('data-locked') === 'false') {
    const backgroundColor = generateColor();
    block.style.background = backgroundColor;
    block.children[0].innerText = backgroundColor;
  }
}


function toggleLock(e) {
  if (e.target.className === 'fa fa-unlock') {
    e.target.className = 'fa fa-lock';
    e.target.setAttribute('data-locked', 'true');
  } else {
    e.target.className = 'fa fa-unlock';
    e.target.setAttribute('data-locked', 'false');
  }
}

function mixBlockColors() {
  colorBlocks.forEach(block => chanegBlockColor(block));
}

function copyColor (e) {
  const color = e.target.previousElementSibling.previousElementSibling.innerText;
  navigator.clipboard.writeText(color);
  showAlert(color);
}

function showAlert (color) {
  alert.style.background = color;
  alert.children[1].innerText = color;
  alert.className = 'success-msg animated fadeIn';
  setTimeout(hideAlert, 1800);
}

function hideAlert () {
  alert.className = 'success-msg-hide animated fadeOut';
}

function savePalleteModal () {
  showcaseDivs.forEach((div, index) => {
    div.style.background = colorBlocks[index].style.background
    div.setAttribute('title', colorBlocks[index].style.background);
  });

  BG.style.display = 'flex';
  BG.style.zIndex = 1000;

  palletteInputName.focus();
}

function closePalleteModal () { 
  BG.style.display = 'none';
  BG.style.zIndex = -999;
}

function savePallette () {
  if (palletteInputName.value === '') {
    document.getElementById('message').style.display = 'inline-block';
  } else {
    const colors = [...colorBlocks].map(block => block.style.background);
    localStorage.setItem('colors', JSON.stringify(colors));
    document.getElementById('message').style.color = '#2da514';
    document.getElementById('message').style.display = 'inline-block';
    document.getElementById('message').innerText = 'Your pallette has been saved successfully!';
  }
}

window.addEventListener('load', init);
changeColorBtn.forEach(btn => btn.addEventListener('click', changeBackgroundColor));
locks.forEach(lock => lock.addEventListener('click', toggleLock));
mixBtn.addEventListener('click', mixBlockColors);
copyBtn.forEach(btn => btn.addEventListener('click', copyColor));
saveBtn.addEventListener('click', savePalleteModal);
closeModal.addEventListener('click', closePalleteModal);
savePalletteBtn.addEventListener('click', savePallette);