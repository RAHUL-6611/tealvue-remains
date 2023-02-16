import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectItemProps } from 'interfaces';

export interface IRequestType {
  label: string;
  value: string;

  screenerSelection: selectItemProps;

  screenerList: selectItemProps[];
}

const initialState: IRequestType = {
  label: 'Future',
  value: 'FUTURE',

  screenerSelection: {
    label: '',
    value: '',
  },
  screenerList: [],
};

export const requestTypeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    updateRequestType: (state, action: PayloadAction<selectItemProps>) => {
      state.label = action.payload.label;
      state.value = action.payload.value;
    },
    updateScreenerSelection: (state, action: PayloadAction<selectItemProps>) => {
      state.screenerSelection.label = action.payload.label;
      state.screenerSelection.value = action.payload.value;
    },
    updateScreenerList: (state, action: PayloadAction<selectItemProps[]>) => {
      state.screenerList = action.payload;
      state.screenerSelection = action.payload[0];
    },
  },
});

export const { updateRequestType, updateScreenerList, updateScreenerSelection } = requestTypeSlice.actions;

export default requestTypeSlice.reducer;
