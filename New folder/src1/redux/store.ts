import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { LS_GLOBAL, LS_USER } from '../constants/localStorage';
import { rootReducer } from './reducers';

const persistConfig = {
  key: 'root',
  version: 1.0,
  storage,
  whitelist: ['global', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persistor = persistStore(store);

// persistor.subscribe(() => {
//   try {
//     const state = store.getState();
//     localStorage.setItem(LS_GLOBAL, JSON.stringify(state.global));
//     localStorage.setItem(LS_USER, JSON.stringify(state.user));
//   } catch (error) {
//     console.error(error);
//   }
// });

const makeStore = { reduxStore: store, persistor };

export default makeStore;

// ?? Infer the `RootState` and `AppDispatch` types from the store itself(recomended from Next.js)
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
