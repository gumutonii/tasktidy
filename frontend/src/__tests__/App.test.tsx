import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders TaskTidy app title', () => {
  render(<App />);
  expect(screen.getByText(/TaskTidy/i)).toBeInTheDocument();
});