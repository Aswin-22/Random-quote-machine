import React, { useState } from 'react';
import quotes from "./assets/quotes.json"
import { useSpeechSynthesis} from 'react-speech-kit';


function App() {

  const { speak, voices } = useSpeechSynthesis();

  function getRandomQuote(){
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  function colorGenerator(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const contrastWithBlack = Math.abs(luminance - 0);

    if (contrastWithBlack < 0.5) {
        return colorGenerator();
    }

    return `rgb(${r}, ${g}, ${b})`;

  }

  const transition = 'all 2s'

  const [quote, setQuote] = useState(getRandomQuote());
  const [RandomColor, setRandomColor] = useState(colorGenerator());

  function handleClick() {

    setQuote(getRandomQuote());
    setRandomColor(colorGenerator());
  }

  function handleTextToSpeech() {
    speak({text : quote.quote + 'by' + quote.author, voice: voices[3]})
  }

  return (
    <div className='main'style={{backgroundColor: RandomColor, transition}}>
      <div className='quote'>
      <div className='quote-text' style={{color: RandomColor, transition}}>{quote.quote}</div>
      <div className='quote-text author' style={{color: RandomColor, transition}}> ~ {quote.author}</div>
      <div className='buttons'>
      <button onClick={handleClick} className='button1'>
        <span className="button_top">Get quote</span>
      </button>
      <button onClick={handleTextToSpeech} className='button1'>
        <span className="button_top2">
          <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 16H5C3.89543 16 3 15.1046 3 14V10C3 8.89543 3.89543 8 5 8H7L13 3V21L10 18.5M16 8.99998C16.5 9.49999 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12M20.6155 15C20.3078 16.1319 19.794 17.206 19 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
      </div>
      </div>
    </div>
  );
}

export default App;
