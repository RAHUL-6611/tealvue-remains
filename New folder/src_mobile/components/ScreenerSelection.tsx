import { components, DropdownIndicatorProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';

import { selectStyle } from './Select';
import { updateSelectTheme } from 'functions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateScreenerSelection } from '../redux/slices/requestType';
import { selectWithTextProps } from '../interfaces/components';
import { Select } from '.';

export default function ScreenerSelection({ title, ...props }: selectWithTextProps) {
  return (
    <Div className="w-full">
      <Select {...props} />
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
