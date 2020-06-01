const btn = document.querySelector(".btn");
const copy = document.querySelector("#copy");
const placeholder = document.querySelector('.hex');
const string = "0123456789ABCDEF";

function generate() {
  let hex = "#";
  for (let i = 0; i < 6; i++) {
    hex += string[Math.floor(Math.random() * string.length)];
  }

  placeholder.innerHTML = hex;
  document.body.style.background = hex;
}

generate();

btn.addEventListener('click', generate);
copy.addEventListener('click', () => {
  const hexValue = placeholder.innerHTML;
  navigator.clipboard.writeText(hexValue);
})
