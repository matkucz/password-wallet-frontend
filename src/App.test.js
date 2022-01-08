import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Password wallet link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Password wallet/i);
  expect(linkElement).toBeInTheDocument();
});
