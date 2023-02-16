import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { selectItemProps } from 'interfaces';

export interface expiryState {
  option: string[];
  future: string[];
  activeFuture: selectItemProps;
  activeOption: selectItemProps;
}
export interface expiryStatePayload {
  option: string[];
  future: string[];
  trade_at: string;
}

const initialState: expiryState = {
  option: [],
  future: [],
  activeFuture: {
    value: '',
    label: 'Select',
  },
  activeOption: {
    value: '',
    label: 'Select',
  },
};

export const expirySlice = createSlice({
  name: 'expiry',
  initialState,
  reducers: {
    updateExpiryDates: (state, action: PayloadAction<expiryStatePayload>) => {
      state.future = action.payload.future;
      state.option = action.payload.option;
      let date = action.payload.future[0];
      for (let i = 1; i < action.payload.future.length; i++) {
        if (new Date(action.payload.future[i]) >= new Date()) {
          date = action.payload.future[i];
          break;
        }
      }
      state.activeFuture = {
        value: date,
        label: date,
      };
      date = action.payload.option[0];
      for (let i = 1; i < action.payload.option.length; i++) {
        if (new Date(action.payload.option[i]) >= new Date()) {
          date = action.payload.option[i];
          break;
        }
      }
      state.activeOption = {
        value: date,
        label: date,
      };
    },
    updateActiveFuture: (state, action: PayloadAction<selectItemProps>) => {
      state.activeFuture = action.payload;
    },
    updateActiveOption: (state, action: PayloadAction<selectItemProps>) => {
      state.activeOption = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateExpiryDates, updateActiveFuture, updateActiveOption } = expirySlice.actions;

export default expirySlice.reducer;
