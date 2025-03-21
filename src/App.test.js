import { render, screen } from '@testing-library/react';
import App from './App';

test('renders pomodoro timer heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Pomodoro Timer/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders start button', () => {
  render(<App />);
  const startButton = screen.getByText(/Start/i);
  expect(startButton).toBeInTheDocument();
});

test('renders settings button', () => {
  render(<App />);
  const settingsButton = screen.getByText(/Settings/i);
  expect(settingsButton).toBeInTheDocument();
});

test('renders timer modes', () => {
  render(<App />);
  const workButton = screen.getByText(/Work/i);
  const shortBreakButton = screen.getByText(/Short Break/i);
  const longBreakButton = screen.getByText(/Long Break/i);
  
  expect(workButton).toBeInTheDocument();
  expect(shortBreakButton).toBeInTheDocument();
  expect(longBreakButton).toBeInTheDocument();
});
