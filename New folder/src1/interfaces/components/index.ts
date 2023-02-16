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

export interface selectProps {
  options: OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>> | { value: string; label: string }[];
  value?: selectItemProps;
  style?: React.CSSProperties;
  onChange?: (newValue: SingleValue<selectItemProps>, actionMeta: ActionMeta<selectItemProps>) => void;
}
export interface selectWithTextProps extends selectProps {
  title: string;
}
