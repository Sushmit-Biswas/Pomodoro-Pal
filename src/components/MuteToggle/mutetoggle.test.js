import { render, screen } from '@testing-library/react';
import MuteToggle from './mutetoggle.js'

test('renders mute toggle', () => {
  render(<MuteToggle volume={1} setVolume={jest.fn()} />);
  const toggleButton = screen.getByRole('button')
  expect(toggleButton.classList.contains('display__mute')).toBe(true)
})