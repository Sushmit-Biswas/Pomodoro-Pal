import { render, screen } from '@testing-library/react'
import Button from './button'

it('renders a close button to close settings', () => {
  render(<Button type="close" buttonText="×" />)
  const closeButton = screen.getByText(/×/i)
  expect(closeButton).toBeInTheDocument()
})

it('renders an apply button for settings', () => {
  render(<Button type="apply" buttonText="Apply" />)
  const applyButton = screen.getByText(/apply/i)
  expect(applyButton).toBeInTheDocument();
});

it('renders a button to show settings', () => {
  render(<Button type="settings" />)
  const settingsButton = screen.getByRole('button')
  expect(settingsButton.classList.contains('pomodoro-app__preferences')).toBe(true)
})