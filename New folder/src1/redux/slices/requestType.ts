import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectItemProps } from 'interfaces';

const initialState = {
  label: 'Future',
  value: 'FUTURE',
};

export const requestTypeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    updateRequestType: (state, action: PayloadAction<selectItemProps>) => {
      state.label = action.payload.label;
      state.value = action.payload.value;
    },
  },
});

export const { updateRequestType } = requestTypeSlice.actions;

export default requestTypeSlice.reducer;
