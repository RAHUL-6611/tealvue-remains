import { configureStore } from '@reduxjs/toolkit';
import expiryDates from './slices/expiryDates';
import global from './slices/global';
import strategy from './slices/strategy';
import requestType from './slices/requestType';
import user from './slices/user';

// ? Creating store
const makeStore = () =>
  configureStore({
    reducer: {
      expiryDates,
      global,
      strategy,
      requestType,
      user,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      });
    },
  });

const store = makeStore();
export default store;

export type AppStore = ReturnType<typeof makeStore>;

// ?? Infer the `RootState` and `AppDispatch` types from the store itself(recomended from Next.js)
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
