import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { selectItemProps } from 'interfaces';

export interface globalStockListItem {
  symbol: string;
  cash: number;
  change: number;
  atm_strike: number;
  close: number;
  lotsize: number;
  maxpain: number;
  pcr_oi: number;
  pcr_vol: number;
}
export interface globalStockItem {
  value: selectItemProps;
  cash: number;
  change: number;
  atm_strike: number;
  close: number;
  lotsize: number;
  maxpain: number;
  pcr_oi: number;
  pcr_vol: number;
}
export interface globalState {
  stock: globalStockItem;
  stockList: globalStockListItem[];
  strategy: {
    selection: {
      label: string;
      value: string;
    };
    current?: {
      label: string;
      value: string;
    };
  };
}

export const initialGlobalState: globalState = {
  stock: {
    value: {
      label: 'NIFTY',
      value: 'NIFTY',
    },
    cash: 0,
    change: 0,
    atm_strike: 0,
    close: 0,
    lotsize: 0,
    maxpain: 0,
    pcr_oi: 0,
    pcr_vol: 0,
  },
  stockList: [],
  strategy: {
    selection: {
      label: 'All',
      value: 'all',
    },
    current: {
      label: 'LONG CALL',
      value: 'LONG_CALL',
    },
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialGlobalState,
  reducers: {
    updateStock: (state, { payload }: PayloadAction<selectItemProps>) => {
      const activeStock = state.stockList.find((val) => val.symbol === payload.value);
      state.stock = {
        value: payload,
        cash: activeStock?.cash!,
        change: activeStock?.change!,
        atm_strike: activeStock?.atm_strike!,
        lotsize: activeStock?.lotsize!,
        close: activeStock?.close!,
        maxpain: activeStock?.maxpain!,
        pcr_oi: activeStock?.pcr_oi!,
        pcr_vol: activeStock?.pcr_vol!,
      };
    },
    updateStockList: (state, { payload }: PayloadAction<globalStockListItem[]>) => {
      state.stockList = payload;
      const activeStock = payload.find((val) => val.symbol === state.stock.value.label);

      state.stock.cash = activeStock?.cash!;
      state.stock.change = activeStock?.change!;
      state.stock.atm_strike = activeStock?.atm_strike!;
      state.stock.close = activeStock?.close!;
      state.stock.lotsize = activeStock?.lotsize!;
      state.stock.maxpain = activeStock?.maxpain!;
      state.stock.pcr_oi = activeStock?.pcr_oi!;
      state.stock.pcr_vol = activeStock?.pcr_vol!;
    },
    updateStrategySelection: (state, action) => {
      state.strategy.selection = action.payload;
    },
    updateStrategyCurrentSelection: (state, action) => {
      state.strategy.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStock, updateStockList, updateStrategySelection, updateStrategyCurrentSelection } = globalSlice.actions;

export default globalSlice.reducer;
