// Init speech synthesis API
const synth = window.speechSynthesis;

// ALL DOM values
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

// Init the voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // loop through voices and create an option for each one
  voices.forEach(voice => {
    // create an option element

    const option = document.createElement("option");
    // fill the option with the voice and the language

    option.textContent = voice.name + `(${voice.lang})`;

    // set option attribues
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);

    // append the option in the select
    voiceSelect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak

const speak = () => {
  // Check if speaking

  if (synth.speaking) {
    console.error("Already speaking!");
    return;
  }

  if (textInput.value !== "") {
    // get speak text

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // speak end
    speakText.onend = e => {
      console.log("Done speaking");
    };

    // speak error
    speakText.onerror = e => {
      console.error("Something went wrong!");
    };

    // selecting the voices
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
    

    // loop through voices

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // speak
    synth.speak(speakText);
  }
};

// Set the event listener

// form submission event
textForm.addEventListener("submit", e => {
  e.preventDefault();

  speak();
  textInput.blur();
});

// change the values of rate
rate.addEventListener("change", e => rateValue.textContent = rate.value);

// change the values of pitch
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value);


// voice select event listener
voiceSelect.addEventListener('change', e => speak());