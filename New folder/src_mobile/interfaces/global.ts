import { AxiosError } from 'axios';
import { selectItemProps } from './components';

export interface customAxiosError extends AxiosError {
  handleGlobally: () => void;
}

export interface dashboardGraphProps {
  expiryOption: selectItemProps;
}

export interface commonObject {
  [key: string]: any;
}

export interface OIData {
  call_oi: number;
  call_chg_oi: number;
  call_delta: number;
  call_theta: number;
  maxpain: number;
  pcr: number;
  lotsize: number;
  strike: number;
  put_oi: number;
  put_chg_oi: number;
  put_delta: number;
  put_theta: number;
}

export interface LTPData {
  strike: number;
  call_ltp: number;
  put_ltp: number;
}

export interface screenerLocation {
  active: string;
}

export interface strategyType {
  title: string;
  image: string;
  path: string;
  type: string;
}

export interface MaxPainData {
  expiry_date: string;
  put_data: {
    strike: string;
    cum_put: string;
  }[];
  call_data: {
    strike: string;
    cum_call: string;
  }[];
  maxpain_strike: number;
  result: boolean;
  symbol: string;
  trade_at: string;
}

export interface BuildupData {
  expiry_date: string;
  oi_buildupdata: {
    strike: number;
    call: {
      buildup: string;
      oi: number;
    };
    put: {
      buildup: string;
      oi: number;
    };
  }[];
  result: boolean;
  symbol: string;
  trade_at: string;
}

export interface IGreeksChartData {
  result: boolean;
  message: string;
  symbol: string;
  expiry_at: string;
  option_type: 'call' | 'put';
  data: {
    time: Date;
    delta: number;
    vega: number;
    gamma: number;
    theta: number;
    strike: number;
  }[];
}

export interface MultiStrikeData {
  ltp_data: {
    time: string;
    top: number;
    trade_date: string;
  }[];
  res1_ce: {
    time: string;
    oi: number;
    trade_date: string;
    strike: string;
    option_type: string;
  }[];
  res2_ce: {
    time: string;
    oi: number;
    trade_date: string;
    strike: string;
    option_type: string;
  }[];
  res3_ce: { time: string; oi: number; trade_date: string; strike: string; option_type: string }[];
  res4_pe: { time: string; oi: number; trade_date: string; strike: string; option_type: string }[];
  res5_pe: { time: string; oi: number; trade_date: string; strike: string; option_type: string }[];
  res6_pe: { time: string; oi: number; trade_date: string; strike: string; option_type: string }[];
  result: boolean;
  symbol: string;
  expiry_at: string;
  message: string;
}
