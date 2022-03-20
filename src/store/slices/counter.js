/* eslint-disable no-param-reassign */

import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  amount: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.amount += 1;
    },
    decrement: (state) => {
      state.amount -= 1;
    },
    incrementByAmount: (state, action) => {
      state.amount += action.payload;
    },
  },
});

export const selectValue = (state) => state.value;
export const selectNegativeValue = createSelector(selectValue, (value) => value * -1);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
