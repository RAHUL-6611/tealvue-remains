import { IActionTypes, IOptionTypes } from '../interfaces/pages/strategy';

export const perFormatter = (p: number) => (p ? floatFormatter(p) + '%' : '0.00%');

export const amountFormatter = (p: number) => {
  if (!p) return '';
  let val = Math.abs(p);
  let output: string = '' + val;
  if (val >= 10000000) {
    output = (val / 10000000).toFixed(2) + ' Cr';
  } else if (val >= 100000) {
    output = (val / 100000).toFixed(2) + ' L';
  }
  return output;
};

export const floatFormatter = (p: number, precision: number = 2) => {
  return p?.toFixed(precision) ?? '0.' + '0'.repeat(precision);
};

export const expandShortCode = (val: string) => {
  if (val === 'LBU') return 'Long Build Up';
  else if (val === 'LU') return 'Long Unwinding';
  else if (val === 'SC') return 'Short Covering';
  else if (val === 'SBU') return 'Short Build Up';
  else if (val === 'N') return '-';

  return val;
};

// ? Used to get option chain unique trade id
export const getOptionChainId = (strike: string, BorS: IActionTypes, type: IOptionTypes) => `${strike}-${BorS}-${type}`;
