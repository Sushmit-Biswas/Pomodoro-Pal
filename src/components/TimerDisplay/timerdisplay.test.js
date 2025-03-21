import React from 'react';
import { createRoot } from 'react-dom/client';
import TimerDisplay from './timerdisplay';

it('TimerDisplay renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<TimerDisplay 
    timerMode="pomo"
    percentage={50}
    timeLeft="25:00"
    isActive={false}
    setIsActive={() => {}}
    buttonText="START"
    setButtonText={() => {}}
    volume={1}
    setVolume={() => {}}
  />);
  root.unmount();
});