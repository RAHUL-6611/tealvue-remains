import { components, DropdownIndicatorProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';

import { selectItemProps } from 'interfaces';
import { selectStyle } from './Select';
import { floatFormatter, updateSelectTheme } from 'functions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateStock } from 'redux/slices/global';
import { useState } from 'react';
import { updateActiveOption } from '../redux/slices/expiryDates';

export interface ISearchFieldProps {
  value?: selectItemProps;
  onChange?: (val: unknown) => void;
  title?: string;
}

export default function SearchField({ value, onChange }: ISearchFieldProps) {
  const dispatch = useAppDispatch();

  const stock = useAppSelector((state) => state.global?.stock);
  const stockList = useAppSelector((state) => state.global?.stockList);

  const [disablePercentage, setDisablePercentage] = useState(false);

  const loadOptions = (query: string) => {
    if (query)
      return new Promise(async (resolve, reject) => {
        stockList.filter((val) => val.symbol.toUpperCase().includes(query.toUpperCase()));

        resolve(
          stockList
            .filter((val) => val.symbol.toUpperCase().includes(query.toUpperCase()))
            .map((val) => ({ value: val.symbol, label: val.symbol })),
        );
      });
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<selectItemProps, true>) => {
    return (
      <components.DropdownIndicator {...props}>
        <span className="icon-search" style={{ fontSize: '1rem' }} />
      </components.DropdownIndicator>
    );
  };

  const defaultOnChange = (val: unknown) => {
    if (stock.value.value === (val as selectItemProps).value) return;

    setDisablePercentage(true);

    dispatch(updateStock(val as selectItemProps));
    dispatch(
      updateActiveOption({
        label: '',
        value: '',
      }),
    );
  };

  return (
    <Div className="w-full">
      <AsyncSelect
        theme={updateSelectTheme}
        value={{ value: stock?.value.value ?? '0', label: `${stock?.value?.label ?? '- '} ${stock.cash}` } || stock?.value}
        onChange={onChange ?? defaultOnChange}
        onFocus={() => setDisablePercentage(true)}
        onBlur={() => setDisablePercentage(false)}
        styles={selectStyle}
        defaultOptions={[
          { value: 'NIFTY', label: 'NIFTY' },
          { value: 'BANKNIFTY', label: 'BANKNIFTY' },
          { value: 'TATASTEEL', label: 'TATASTEEL' },
        ]}
        cacheOptions
        placeholder="Search ..."
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        loadOptions={loadOptions}
      />

      {!disablePercentage && (
        <p>
          <span className={stock.change < 0 ? 'red' : 'green'}>&nbsp; {floatFormatter(stock.change)}%</span>
        </p>
      )}
    </Div>
  );
}

const Div = styled.div`
  position: relative;

  h6 {
    font-size: 1rem;
    margin-bottom: 0.3em;
    color: ${(p) => p.theme.palette.primary};
  }

  p {
    position: absolute;
    top: 20%;
    right: 2.5rem;
    font-size: 0.9rem;

    span.hidden-text {
      visibility: hidden;
    }

    span.red {
      color: ${(p) => p.theme.palette.danger};
    }

    .green {
      color: ${(p) => p.theme.palette.success};
    }
  }
`;
