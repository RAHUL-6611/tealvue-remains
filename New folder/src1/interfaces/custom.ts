import { commonObject } from './global';

export interface chartData {
  title: string;
  color: string;
  type: string;
  data: {
    name: string;
    value: number | string;
  }[];
  screener?: string;
}

export interface chartInt {
  text: string;
  chart: commonObject;
  screener?: string;
}

export interface ivChartInt {
  status: boolean;
  symbol: string;
  type: string;
  iv_history: IVHistory[];
  ohlc_data: IOhlcData[];
}

export interface ISkewData {
  expiry_date: string;
  symbol: string;
  skew_data: Record<
    string,
    {
      time: string;
      iv: number;
      strike: string;
      option_type: 'CE' | 'PE';
    }[]
  >;
}

export interface IOhlcData {
  trade_date: string;
  expiry_date: string;
  y: number[];
  iv: number;
}

export interface IVHistory {
  trade_date: string;
  atm_strike: number;
  expiry_date: string;
  atm_iv: number;
  option_type: 'CE' | 'PE';
}
