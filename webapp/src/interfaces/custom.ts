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
  iv_history: IVHistoryInt[];
  ohlc_data: Array<Record<string, string>>;
}

export interface IVHistoryInt {
  trade_date: string;
  expiry_date: string;
  atm_iv: number;
}
