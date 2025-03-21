import { render, screen } from '@testing-library/react';
import { createRoot } from 'react-dom/client';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('App renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<App />);
  root.unmount();
});

test('renders pomodoro heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/pomodoro/i);
  expect(headingElement).toBeInTheDocument();
});