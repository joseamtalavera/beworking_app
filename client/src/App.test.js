import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const welcomeElement = screen.getByText(/Welcome to the BeWorking new Website!/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders login button', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const buttonElement = screen.getByText(/Click here to login/i);
  expect(buttonElement).toBeInTheDocument();
});