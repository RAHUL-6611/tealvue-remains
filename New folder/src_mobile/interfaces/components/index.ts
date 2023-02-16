import React, { InputHTMLAttributes } from 'react';
import { ActionMeta, GroupBase, OptionsOrGroups, SingleValue } from 'react-select';

export interface LayoutSettings {
  children: JSX.Element | JSX.Element[];
}

export interface activeItemProps {
  title: string;
  id: string;
  col?: string;
}

export interface activeProps {
  active: activeItemProps;
  setActive: React.Dispatch<React.SetStateAction<activeItemProps>>;
  values: activeItemProps[];
  action?: (act: activeItemProps) => void;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  disabled?: boolean;
}

export interface activePropsTwo {
  // active: activeItemProps;
  // setActive: React.Dispatch<React.SetStateAction<activeItemProps>>;
  values?: activeItemProps[];
  action?: (act: activeItemProps) => void;
  // containerStyle?: React.CSSProperties;
  // itemStyle?: React.CSSProperties;
  // disabled?: boolean;
}

export interface searchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  handleSearch?: () => void;
}

export interface NavigatorProps {
  title: string;
  items: {
    title: string;
    path: string;
  }[];
}

export interface SlideBgProps {
  links: {
    name: string;
    path: string;
  }[];
}

export interface selectItemProps {
  value: string;
  label: string;
}

export enum screenTypeEnum {
  FUTURE,
  OPTION,
}

export interface tableDataProps {
  tableData: tableDataElements;
  option: string | undefined;
  strikePrice?: string | number;
}

export interface opScreenerProps {
  strikePrice?: string | number;
  opScreener?: boolean | undefined;
}

export interface tableDataElements {
  map(arg0: () => any): any;
  time: string;
  label_value: string;
  symbol: String;
  price: number;
  oi: number;
  build_up: string;
  delta: number;
  discount: string | number | null | undefined;
  gamma: number | null;
  iv: number | null;
  iv_change: number | null;
  oi_change: number | null;
  premium: number | null;
  price_change: number | null;
  spot: number | null;
  strike: string | number | null | undefined;
  theta: number | null;
  ttv: number | null;
  type: string;
  vega: number | null;
  volume: number | null;
  volume_change: number | null;
  basis?: number;
}

export interface selectProps {
  options: OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>> | { value: string; label: string }[];
  value?: selectItemProps;
  style?: React.CSSProperties;
  onChange?: (newValue: SingleValue<selectItemProps>, actionMeta: ActionMeta<selectItemProps>) => void;
}
export interface selectWithTextProps extends selectProps {
  title: string;
}
