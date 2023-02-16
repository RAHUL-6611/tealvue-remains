import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOptionChainId } from '../../functions';
import { commonObject, selectItemProps } from '../../interfaces';
import { IActionTypes, IOptionTypes } from '../../interfaces/pages/strategy';

export interface tradeType {
  active: boolean;
  BorS: string;
  expiry: selectItemProps;
  strike: number;
  type: string;
  lots: number;
  price: number;
  iv: number;
  id: string;
}

export interface strategyState {
  wholeData: commonObject;
  nifty_target: number;
  expiry_date: Date;
  trade: {
    option: {
      type1: string;
      type2: string;
    };
    values: tradeType[];
  };
}

const initialState: strategyState = {
  wholeData: {},
  nifty_target: 0,
  expiry_date: new Date(),
  trade: {
    option: {
      type1: 'opt',
      type2: 'ltp',
    },
    values: [],
  },
};

export const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    updateNiftyTarget: (state, { payload }: PayloadAction<number>) => {
      state.nifty_target = payload;
    },
    updateExpiry: (state, { payload }: PayloadAction<Date>) => {
      state.expiry_date = payload;
    },
    addTrade: (state, { payload }: PayloadAction<tradeType>) => {
      const index = state.trade.values.findIndex(
        (val) => val.id === getOptionChainId(`${payload.strike}`, payload.BorS as IActionTypes, payload.type as IOptionTypes),
      );

      if (index === -1) {
        // ? Check previous type of order is there or not
        const prevIndex = state.trade.values.findIndex(
          (val) => val.id === getOptionChainId(`${payload.strike}`, payload.BorS === 'buy' ? 'sell' : 'buy', payload.type as IOptionTypes),
        );

        if (prevIndex !== -1) {
          // ? Only add there is no buy or sell
          state.trade.values = state.trade.values.filter((val) => val.id !== state.trade.values[prevIndex].id);
        }

        state.trade.values.push(payload);
      }
      // else {
      // state.trade.values[index] = payload;
      // }
    },
    updateTradeList: (state, { payload }: PayloadAction<tradeType[]>) => {
      state.trade.values = payload;
    },

    deleteTrade: (state, { payload }: PayloadAction<string>) => {
      state.trade.values = state.trade.values.filter((val) => val.id !== payload);
    },
    updateTradeType1: (state, { payload }: PayloadAction<string>) => {
      state.trade.option.type1 = payload;
    },
    updateTradeType2: (state, { payload }: PayloadAction<string>) => {
      state.trade.option.type2 = payload;
    },
    updateTradeLot: (state, { payload }: PayloadAction<{ id: string; lots: number }>) => {
      const index = state.trade.values.findIndex((val) => val.id === payload.id);
      state.trade.values[index].lots = payload.lots;
    },
    updateTradeExpiry: (state, { payload }: PayloadAction<{ id: string; expiry: selectItemProps }>) => {
      const index = state.trade.values.findIndex((val) => val.id === payload.id);
      state.trade.values[index].expiry = payload.expiry;
    },
    updateTradeStrike: (state, { payload }: PayloadAction<{ strike: number; id: string; type: 'inc' | 'dec'; CorP: 'C' | 'P' }>) => {
      const index = state.trade.values.findIndex((val) => val.id === payload.id);
      const keys = Object.keys(state.wholeData['option_data']);
      const diff = Number(keys[1]) - Number(keys[0]);
      const newValue =
        state.wholeData['option_data'][Number(payload.strike) + Number(payload.type === 'inc' ? diff : '-' + diff)][
          'C' === payload.CorP ? 0 : 1
        ];

      state.trade.values[index].strike = newValue?.strike;
      state.trade.values[index].price = newValue?.price;
    },
    updateTradeIV: (state, { payload }: PayloadAction<{ id: string; type: 'inc' | 'dec' }>) => {
      const index = state.trade.values.findIndex((val) => val.id === payload.id);

      state.trade.values[index].iv = Number(state.trade.values[index].iv) + Number(payload.type === 'inc' ? 1 : -1);
    },
    updateWholeData: (state, { payload }: PayloadAction<commonObject>) => {
      state.wholeData = payload;
    },
    toggleActive: (state, { payload }: PayloadAction<string>) => {
      const index = state.trade.values.findIndex((val) => val.id === payload);
      state.trade.values[index].active = !state.trade.values[index].active;
    },
    clearAllTrades: (state, _payload) => {
      state.trade = {
        option: {
          type1: 'opt',
          type2: 'ltp',
        },
        values: [],
      };
    },
  },
});

export const {
  updateNiftyTarget,
  updateExpiry,
  addTrade,
  updateTradeList,
  deleteTrade,
  updateTradeType1,
  updateTradeType2,
  updateTradeLot,
  updateTradeExpiry,
  updateTradeStrike,
  updateWholeData,
  updateTradeIV,
  toggleActive,
  clearAllTrades,
} = strategySlice.actions;

export default strategySlice.reducer;
