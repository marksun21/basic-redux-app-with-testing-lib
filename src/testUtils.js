import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import counterReducer from './features/counter/counterSlice';

export const renderWithState = (
  ui,
  { initialState, ...renderOptions } = {}
) => {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
  
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};