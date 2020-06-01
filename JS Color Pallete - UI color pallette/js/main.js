// DOM elements
const colorBlock = document.querySelectorAll(".color-block");
const newColors = document.querySelectorAll("#change-color");
const lock = document.querySelectorAll(".lock i");
const hex_code = document.querySelectorAll("#hex-code");
const copy_btn = document.querySelectorAll("#copy-btn");
const mix_btn = document.querySelector('#mix-btn');
const save_btn = document.querySelector('#save-btn');
const BG = document.querySelector('.bg');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close');
const savePalleteBtn = document.querySelector('#save-pallette');
const pallette_name = document.querySelector('#pallette-name');
const colors = document.querySelectorAll('.showcase div');

const messages = ['Copied!', 'Paste me!', 'YAY!', 'Nice choice!', 'Wonderful!', 'Awesome!', 'At your service!', 'What a choice!', 'Yo!'];

const success_msg = document.querySelector('.success-msg-hide');

// generateColor will genarate random hex color code
const generateColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

// changeColor function to change the color of the blocks
const changeColor = e => {
  if (
    e.target.nextElementSibling.nextElementSibling.children[0].getAttribute(
      "data-locked"
    ) === "false"
  ) {
    // generate a random color
    const randomColor = generateColor();

    // change the background color
    e.target.parentElement.style.background = randomColor;

    // update the hex code in the UI
    e.target.previousElementSibling.textContent = randomColor;
  } else {
    console.log('block is locked')
  }
};

// to copy the color to the clipboard
const copyColor = e => {
  const hex = e.target.previousElementSibling.previousElementSibling.textContent;

  // show the copied message with the respective backgruond
  success_msg.children[0].innerHTML = messages[Math.floor(Math.random() * messages.length)];
  success_msg.style.background = hex;
  success_msg.children[1].textContent = hex;
  success_msg.classList.remove('success-msg-hide');
  success_msg.classList.remove('fadeOut');
  success_msg.classList.add('success-msg');
  success_msg.classList.add('fadeIn');

  setTimeout(() => {
    success_msg.classList.remove('fadeIn');
    success_msg.classList.add('fadeOut');
    success_msg.classList.add('success-msg-hide');
    success_msg.classList.remove('success-msg');
  }, 1700);

  navigator.clipboard.writeText(hex);
}

const lockColor = e => {
  if(e.target.getAttribute('data-locked') === "false") {
    // if the lock is not locked then lock it
    e.target.setAttribute('data-locked', 'true');
    e.target.classList.remove('fa-unlock');
    e.target.classList.add('fa-lock');
  } else {
    e.target.classList.remove('fa-lock');
    e.target.classList.add('fa-unlock');
    e.target.setAttribute('data-locked', 'false');
  }
}

const init = () => {
  // genrate random colors and apply to each block

  colorBlock.forEach((block, index) => {
    const randomColor = generateColor();
    block.style.background = randomColor;

    // update the hex_code text
    hex_code[index].textContent = randomColor;
  });

  // Add event listeners to the 'new color' and 'copy' buttons
  newColors.forEach(btn => btn.addEventListener("click", changeColor));
  copy_btn.forEach(btn => btn.addEventListener('click', copyColor));
  lock.forEach(l => l.addEventListener('click', lockColor))
};

const mixup = () => {

  colorBlock.forEach(block => {
    if(block.children[3].children[0].getAttribute('data-locked') === 'false') {
      const color = generateColor();
      block.style.background = color;
      block.children[0].textContent = color; 
    }
  });
}

const changeBG = (addClass, removeClass, displaySetting, z_index) => {
  BG.classList.add(addClass);
  BG.classList.remove(removeClass);
  BG.style.display = displaySetting;
  BG.style.zIndex = z_index;
}


const openModal = () => {
  changeBG('fadeIn', 'fadeOut', 'flex', 999);
  colors.forEach((colorCircle, index) => {
    colorCircle.setAttribute('title', colorBlock[index].style.background);
    colorCircle.style.background = colorBlock[index].style.background;
  })
}

const closeModal = e => {
  if(e.target.classList.contains('bg') || e.target === closeModalBtn) {
    changeBG('fadeOut', 'fadeIn', 'none', -999);
  }
}

const savePallete = () => {
  let pallette = [];

  if(pallette_name.value !== '') {
    colors.forEach(color => {
      pallette.push(color.style.background);
    });

    localStorage.setItem('pallete', pallette);
  } else {
    alert('Please enter a name for the pallette');
  }
}

mix_btn.addEventListener('click', mixup);
save_btn.addEventListener('click', openModal)
window.addEventListener("load", init);


// open the modal
save_btn.addEventListener('click', openModal);
// close the modal on outside click

BG.addEventListener('click', closeModal);

savePalleteBtn.addEventListener('click', savePallete);