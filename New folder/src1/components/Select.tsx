import RSelect, { CSSObjectWithLabel } from 'react-select';
import styled from 'styled-components';

import { updateSelectTheme } from 'functions';
import { selectProps } from 'interfaces';
import { Theme } from 'constants/theme';

export const selectStyle = {
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    boxShadow: 'none',
    background: 'transparent',
    fontWeight: 500,
    fontSize: '0.9rem',
  }),
  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    '::-webkit-scrollbar': {
      width: '0.5em',
    },
    '::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: `${Theme.palette.primary}`,
      transition: 'all 0.2s',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#56a0a0',
    },
  }),
};

export default function Select({ options, style, value, onChange }: selectProps) {
  return (
    <Div style={style}>
      <RSelect
        theme={updateSelectTheme}
        // styles={selectStyle}
        options={options}
        value={value}
        onChange={onChange}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </Div>
  );
}

const Div = styled.div`
  width: 200px;
  /* background: red; */
`;
