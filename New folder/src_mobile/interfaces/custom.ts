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

export interface IOptionChainResponse {
  result: boolean;
  message: string;
  data: {
    atm_strike: number;
    symbol: string;
    expiry_at: string;
  };
  tableData: ITtableDataOptionChain[];
}

export interface ITtableDataOptionChain {
  strike: string;
  call_iv_change: number;
  call_iv: number;
  call_oi_change: number;
  call_oi: number;
  call_volume_change: number;
  call_volume: number;
  call_price: number;
  put_iv_change: number;
  put_iv: number;
  put_oi_change: number;
  put_oi: number;
  put_volume_change: number;
  put_volume: number;
  put_price: number;
}
