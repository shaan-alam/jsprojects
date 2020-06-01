// DOM elements

const screen = document.querySelector(".screen");
const clear = document.querySelector('.clear');
const buttons = document.querySelectorAll(".btn");
let stringToEval = "";

function init() {
  // add an event listener to all the buttons

  buttons.forEach(button => {
    button.addEventListener("click", numberInsert);
  });
}

function numberInsert(e) {
  if (e.target.dataset.id) {
    // get the number
    const number = e.target.innerHTML;

    if (typeof Number(number) === "number" || number === '.') {
      
      // if the 'number' variable is actually a number or wildcard period then concat it to the innerHTML of screen and stringToEval
      
      screen.innerHTML += number;
      stringToEval += number;
    }
  } else if(e.target.dataset.operator) {

    // if the event's target is an operator then 

    screen.innerHTML = '';
    stringToEval += e.target.dataset.operator;
  } else if(e.target.dataset.equals) {

    // if the event's target is an equal sign

    const result = eval(stringToEval);
    screen.innerHTML = result;
  } else {

    // else if by default the event's target is a clear button

    screen.innerHTML = '';
    stringToEval = '';
  }

}

document.addEventListener('load', init);