import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentTimer, setCurrentTimer] = useState('pomodoro');
  
  return (
    <div className="pomodoro-app">
      <h1>pomodoro</h1>
      
      <div className="controls">
        <input 
          type="radio" 
          name="timer" 
          id="pomodoro" 
          value="pomodoro" 
          checked={currentTimer === 'pomodoro'}
          onChange={(e) => setCurrentTimer(e.target.value)}
        />
        <label htmlFor="pomodoro" className="controls__button">pomodoro</label>
        
        <input 
          type="radio" 
          name="timer" 
          id="short-break" 
          value="short-break"
          checked={currentTimer === 'short-break'}
          onChange={(e) => setCurrentTimer(e.target.value)}
        />
        <label htmlFor="short-break" className="controls__button">short break</label>
        
        <input 
          type="radio" 
          name="timer" 
          id="long-break" 
          value="long-break"
          checked={currentTimer === 'long-break'}
          onChange={(e) => setCurrentTimer(e.target.value)}
        />
        <label htmlFor="long-break" className="controls__button">long break</label>
      </div>
      
      <div className="timer">
        <div className="timer__display">
          <button className="display__start-pause">START</button>
        </div>
      </div>
      
      <button className="pomodoro-app__preferences">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M24.0378 15.365L26.9959 17.3884C27.2727 17.5862 27.3397 17.9544 27.142 18.2312L24.1769 22.6651C23.9792 22.9419 23.611 23.0089 23.3342 22.8111L20.3761 20.7878C19.3181 21.6344 18.0939 22.2931 16.7496 22.7117V26.0867C16.7496 26.4046 16.4931 26.6611 16.1752 26.6611H10.8252C10.5073 26.6611 10.2508 26.4046 10.2508 26.0867V22.7117C8.9066 22.2931 7.68243 21.6344 6.62435 20.7878L3.6663 22.8111C3.38953 23.0089 3.02135 22.9419 2.82357 22.6651L-0.141546 18.2312C-0.339324 17.9544 -0.272318 17.5862 0.00445748 17.3884L2.9625 15.365C2.83747 14.5882 2.83747 13.8118 2.9625 13.035L0.00445748 11.0117C-0.272318 10.8139 -0.339324 10.4457 -0.141546 10.1689L2.82357 5.73496C3.02135 5.45818 3.38953 5.39118 3.6663 5.58896L6.62435 7.61228C7.68243 6.76563 8.9066 6.10693 10.2508 5.68834V2.31334C10.2508 1.99544 10.5073 1.73895 10.8252 1.73895H16.1752C16.4931 1.73895 16.7496 1.99544 16.7496 2.31334V5.68834C18.0939 6.10693 19.3181 6.76563 20.3761 7.61228L23.3342 5.58896C23.611 5.39118 23.9792 5.45818 24.1769 5.73496L27.142 10.1689C27.3397 10.4457 27.2727 10.8139 26.9959 11.0117L24.0378 13.035C24.1629 13.8118 24.1629 14.5882 24.0378 15.365V15.365ZM13.5002 18.2C15.9754 18.2 18.0002 16.1752 18.0002 13.7C18.0002 11.2248 15.9754 9.19999 13.5002 9.19999C11.025 9.19999 9.00018 11.2248 9.00018 13.7C9.00018 16.1752 11.025 18.2 13.5002 18.2Z" fill="#D7E0FF" fillOpacity="0.36"/>
        </svg>
      </button>
    </div>
  );
}

export default App;