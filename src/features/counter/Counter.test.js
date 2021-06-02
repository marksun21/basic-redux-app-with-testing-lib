import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';
import { renderWithState } from '../../testUtils';

// Helper method
const cleanRender = () => {
  const initialState = {
    counter: {
      value: 0,
    }
  };

  renderWithState(
    <Counter />
  , initialState);
}

test('renders the + button', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );

    expect(getByText(/\+/i)).toBeInTheDocument();
});

test('renders the - button', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  expect(getByText(/-/i)).toBeInTheDocument();
});

test('displays 0 as default value for counter', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  expect(getByText(/0/i)).toBeInTheDocument();
});

test('increments counter from 0 to 1 if + button is clicked', () => {
  cleanRender();

  userEvent.click(screen.getByText('+'));
  expect(screen.getByText('1')).toBeInTheDocument();
});

test('decrements counter from 0 to -1 if - button is clicked', () => {
  cleanRender();

  userEvent.click(screen.getByTestId('decrement-btn'));
  expect(screen.getByText('-1')).toBeInTheDocument();
});

test('increments by 5 if you type in 5 in the input and click "Add Amount" button', () => {
  cleanRender();

  userEvent.type(screen.getByTestId('increment-amt-input'), '{backspace}5');
  userEvent.click(screen.getByTestId('add-amt-btn'));
  expect(screen.getByText('5')).toBeInTheDocument();
})

test('increments by 3 after some time if you type in 3 in the input and click "Add Async" button', async () => {
  cleanRender();

  userEvent.type(screen.getByTestId('increment-amt-input'), '{backspace}3');
  userEvent.click(screen.getByTestId('add-async-btn'));
  waitFor(() => {
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});