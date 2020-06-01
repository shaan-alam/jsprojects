const synth = window.speechSynthesis;

// all DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');


// Init the voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // loop throgh each voice and add an option
  voices.forEach(voice => {

    // create an option
    const option = document.createElement('option');

    option.textContent = voice.name + `${voice.lang}`;

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);

    voiceSelect.appendChild(option);

  });
};

getVoices();

if(synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// speak function

const speak = () => {
  if(synth.speaking) {
    console.error('Already speaking');
    return;
  }

  if(textInput.value != '') {

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e => {
      console.log('Done Speaking');
    }

    speakText.onerror = e => {
      console.log('Something went wrong');
    }

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
  
    voices.forEach(voice => {
      if(voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
  }

};


textForm.addEventListener('submit', e => {
  e.preventDefault();

  speak();
  textInput.blur();
});

rate.addEventListener('change', e => rateValue.innerHTML = rate.value);

pitch.addEventListener('change', e => pitchValue.innerHTML = pitch.value);

voiceSelect.addEventListener('change', e => speak());