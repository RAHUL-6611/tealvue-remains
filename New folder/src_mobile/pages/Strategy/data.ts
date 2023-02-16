import { strategyType } from 'interfaces';

export const strategyTypes: strategyType[] = [
  {
    title: 'BULL CALL SPREAD',
    image: 'BULL CALL SPREAD',
    path: 'BULL_CALL_SPREAD',
    type: 'bullish',
  },
  {
    title: 'BULL PUT SPREAD',
    image: 'BULL PUT SPREAD',
    path: 'BULL_PUT_SPREAD',
    type: 'bullish',
  },
  {
    title: 'SHORT PUT',
    image: 'SHORT PUT',
    path: 'SHORT_PUT',
    type: 'bullish',
  },
  {
    title: 'LONG CALL',
    image: 'LONG CALL',
    path: 'LONG_CALL',
    type: 'bullish',
  },
  {
    title: 'LONG PUT',
    image: 'LONG PUT',
    path: 'LONG_PUT',
    type: 'bearish',
  },
  {
    title: 'SHORT CALL',
    image: 'SHORT CALL',
    path: 'SHORT_CALL',
    type: 'bearish',
  },
  {
    title: 'BEAR CALL SPREAD',
    image: 'BEAR CALL SPREAD',
    path: 'BEAR_CALL_SPREAD',
    type: 'bearish',
  },
  {
    title: 'BEAR PUT SPREAD',
    image: 'BEAR PUT SPREAD',
    path: 'BEAR_PUT_SPREAD',
    type: 'bearish',
  },
  {
    title: 'SHORT STRADDLE',
    image: 'SHORT STRADDLE',
    path: 'SHORT_STRADDLE',
    type: 'neutral',
  },
  {
    title: 'SHORT STRANGLE',
    image: 'SHORT STRANGLE',
    path: 'SHORT_STRANGLE',
    type: 'neutral',
  },
  {
    title: 'SHORT IRON CONDOR',
    image: 'SHORT IRON CONDOR',
    path: 'SHORT_IRON_CONDOR',
    type: 'neutral',
  },
  {
    title: 'LONG STRADDLE',
    image: 'LONG STRADDLE',
    path: 'LONG_STRADDLE',
    type: 'volatile',
  },
  {
    title: 'LONG STRANGLE',
    image: 'LONG STRANGLE',
    path: 'LONG_STRANGLE',
    type: 'volatile',
  },
  {
    title: 'LONG IRON CONDOR',
    image: 'LONG IRON CONDOR',
    path: 'LONG_IRON_CONDOR',
    type: 'volatile',
  },
  {
    title: 'LONG PUT BUTTERFLY',
    image: 'LONG PUT BUTTERFLY',
    path: 'LONG_PUT_BUTTERFLY',
    type: 'neutral',
  },
  {
    title: 'LONG CALL BUTTERFLY',
    image: 'LONG CALENDAR CALL',
    path: 'LONG_CALL_BUTTERFLY',
    type: 'neutral',
  },
  {
    title: 'SHORT PUT BUTTERFLY',
    image: 'SHORT CALENDAR_PUTS',
    path: 'SHORT_PUT_BUTTERFLY',
    type: 'volatile',
  },
  {
    title: 'SHORT CALL BUTTERFLY',
    image: 'SHORT CALENDAR CALLS',
    path: 'SHORT_CALL_BUTTERFLY',
    type: 'volatile',
  },
];
