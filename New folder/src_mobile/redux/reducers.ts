import { combineReducers } from 'redux';
import expiryDates from './slices/expiryDates';
import global from './slices/global';
import strategy from './slices/strategy';
import requestType from './slices/requestType';
import user from './slices/user';

export const rootReducer = combineReducers({
  expiryDates,
  global,
  strategy,
  requestType,
  user,
});
