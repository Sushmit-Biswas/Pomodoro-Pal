import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

// Font options
const FONTS = [
  "'Roboto', sans-serif",
  "'Montserrat', sans-serif",
  "'Open Sans', sans-serif"
];

// Color theme options
const COLOR_THEMES = {
  orange: {
    primary: '#ff6347',
    secondary: '#ff8c42',
    background: '#1e1e1e'
  },
  cyan: {
    primary: '#00b4d8',
    secondary: '#48cae4',
    background: '#1e1e1e'
  },
  purple: {
    primary: '#9d4edd',
    secondary: '#c77dff',
    background: '#1e1e1e'
  }
};

function App() {
  // Timer states
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  
  // Settings states
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [colorTheme, setColorTheme] = useState('orange');
  const [fontIndex, setFontIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  // Refs
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  
  // Sound functions
  const playStart = () => {
    try {
      // Play a beep sound using the Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Error playing start sound:', error);
    }
  };

  const playPause = () => {
    try {
      // Play a lower beep sound using the Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Error playing pause sound:', error);
    }
  };

  const playFinish = () => {
    try {
      // Play a series of beeps to indicate completion
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const playBeep = (freq, time, duration) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + time);
        oscillator.connect(audioContext.destination);
        oscillator.start(audioContext.currentTime + time);
        oscillator.stop(audioContext.currentTime + time + duration);
      };
      
      playBeep(587.33, 0, 0.1); // D5
      playBeep(783.99, 0.15, 0.1); // G5
      playBeep(1046.50, 0.3, 0.2); // C6
    } catch (error) {
      console.log('Error playing finish sound:', error);
    }
  };
  
  // Switch mode function
  const switchMode = () => {
    const nextMode = modeRef.current === 'work' 
      ? 'shortBreak' 
      : modeRef.current === 'shortBreak' 
        ? 'work'
        : 'shortBreak';
    
    const nextSeconds = nextMode === 'work' 
      ? workMinutes * 60 
      : nextMode === 'shortBreak' 
        ? shortBreakMinutes * 60
        : longBreakMinutes * 60;
    
    setMode(nextMode);
    modeRef.current = nextMode;
    
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
    
    playFinish();
  };
  
  // Initialize timer when mode changes
  useEffect(() => {
    const modeSeconds = mode === 'work' 
      ? workMinutes * 60 
      : mode === 'shortBreak' 
        ? shortBreakMinutes * 60
        : longBreakMinutes * 60;
        
    setSecondsLeft(modeSeconds);
    secondsLeftRef.current = modeSeconds;
  }, [mode, workMinutes, shortBreakMinutes, longBreakMinutes]);
  
  // Timer tick function - Added switchMode to dependency array
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      
      if (secondsLeftRef.current === 0) {
        switchMode();
      } else {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [switchMode]); // Added switchMode to dependencies
  
  // Total seconds based on current mode
  const totalSeconds = mode === 'work'
    ? workMinutes * 60
    : mode === 'shortBreak'
      ? shortBreakMinutes * 60
      : longBreakMinutes * 60;
  
  // Progress percentage
  const percentage = Math.round(secondsLeft / totalSeconds * 100);
  
  // Current theme colors
  const currentTheme = COLOR_THEMES[colorTheme];
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle start/pause
  const handleStartPause = () => {
    if (isPaused) {
      playStart();
    } else {
      playPause();
    }
    setIsPaused(!isPaused);
    isPausedRef.current = !isPausedRef.current;
  };

  return (
    <div className="app" style={{ backgroundColor: currentTheme.background, fontFamily: FONTS[fontIndex] }}>
      <div className="container">
        <h1>Pomodoro Timer</h1>
        
        <div className="timer-container">
          <div className={`timer ${!isPaused ? 'running' : ''}`}>
            <CircularProgressbar
              value={percentage}
              text={formatTime(secondsLeft)}
              styles={buildStyles({
                textColor: '#fff',
                pathColor: currentTheme.primary,
                trailColor: 'rgba(255, 255, 255, .2)',
                textSize: '16px',
              })}
            />
          </div>
          
          <div className="controls">
            <button 
              className="control-button"
              onClick={handleStartPause}
              style={{ backgroundColor: currentTheme.primary }}
            >
              {isPaused ? 'Start' : 'Pause'}
            </button>
            
            <button 
              className="settings-button" 
              onClick={() => setShowSettings(!showSettings)}
              style={{ backgroundColor: currentTheme.secondary }}
            >
              Settings
            </button>
          </div>
          
          <div className="mode-buttons">
            <button 
              className={`mode-button ${mode === 'work' ? 'active' : ''}`}
              onClick={() => {
                setMode('work');
                setSecondsLeft(workMinutes * 60);
                secondsLeftRef.current = workMinutes * 60;
                setIsPaused(true);
                isPausedRef.current = true;
              }}
              style={{ 
                backgroundColor: mode === 'work' ? currentTheme.primary : 'transparent',
                borderColor: currentTheme.primary 
              }}
            >
              Work
            </button>
            
            <button 
              className={`mode-button ${mode === 'shortBreak' ? 'active' : ''}`}
              onClick={() => {
                setMode('shortBreak');
                setSecondsLeft(shortBreakMinutes * 60);
                secondsLeftRef.current = shortBreakMinutes * 60;
                setIsPaused(true);
                isPausedRef.current = true;
              }}
              style={{ 
                backgroundColor: mode === 'shortBreak' ? currentTheme.primary : 'transparent',
                borderColor: currentTheme.primary 
              }}
            >
              Short Break
            </button>
            
            <button 
              className={`mode-button ${mode === 'longBreak' ? 'active' : ''}`}
              onClick={() => {
                setMode('longBreak');
                setSecondsLeft(longBreakMinutes * 60);
                secondsLeftRef.current = longBreakMinutes * 60;
                setIsPaused(true);
                isPausedRef.current = true;
              }}
              style={{ 
                backgroundColor: mode === 'longBreak' ? currentTheme.primary : 'transparent',
                borderColor: currentTheme.primary 
              }}
            >
              Long Break
            </button>
          </div>
        </div>
        
        {showSettings && (
          <div className="settings">
            <h2>Settings</h2>
            
            <div className="settings-section">
              <h3>Time (minutes)</h3>
              <div className="time-settings">
                <div className="time-setting">
                  <label>Work</label>
                  <input 
                    type="number" 
                    value={workMinutes} 
                    onChange={e => setWorkMinutes(parseInt(e.target.value) || 1)} 
                    min="1" 
                    max="60"
                  />
                </div>
                <div className="time-setting">
                  <label>Short Break</label>
                  <input 
                    type="number" 
                    value={shortBreakMinutes} 
                    onChange={e => setShortBreakMinutes(parseInt(e.target.value) || 1)} 
                    min="1" 
                    max="30"
                  />
                </div>
                <div className="time-setting">
                  <label>Long Break</label>
                  <input 
                    type="number" 
                    value={longBreakMinutes} 
                    onChange={e => setLongBreakMinutes(parseInt(e.target.value) || 1)} 
                    min="1" 
                    max="60"
                  />
                </div>
              </div>
            </div>
            
            <div className="settings-section">
              <h3>Color Theme</h3>
              <div className="color-options">
                {Object.keys(COLOR_THEMES).map((color) => (
                  <button 
                    key={color}
                    className={`color-option ${colorTheme === color ? 'selected' : ''}`}
                    style={{ backgroundColor: COLOR_THEMES[color].primary }}
                    onClick={() => setColorTheme(color)}
                    aria-label={`${color} theme`}
                  />
                ))}
              </div>
            </div>
            
            <div className="settings-section">
              <h3>Font</h3>
              <div className="font-options">
                {FONTS.map((font, index) => (
                  <button 
                    key={index}
                    className={`font-option ${fontIndex === index ? 'selected' : ''}`}
                    style={{ fontFamily: font }}
                    onClick={() => setFontIndex(index)}
                    aria-label={`Font option ${index + 1}`}
                  >
                    Aa
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="close-settings"
              onClick={() => setShowSettings(false)}
              style={{ backgroundColor: currentTheme.secondary }}
            >
              Close Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
