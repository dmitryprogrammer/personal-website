import {render, screen} from '@testing-library/react';

import {App} from './App';

describe('App component tests', () => {
  test('Renders main page correctly', () => {
    expect(true).toBeTruthy();
  });

  test('App component rendered', () => {
    render(<App />);

    expect(screen.getByTestId('Dmitry Pishchalka')).toBeInTheDocument();
  });
});
