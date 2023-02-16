import styled from 'styled-components';

import { selectWithTextProps } from 'interfaces';
import Select from './Select';

export default function SelectWithTitle({ title, ...props }: selectWithTextProps) {
  return (
    <Div>
      <Select {...props} />
    </Div>
  );
}

const Div = styled.div`
  h6 {
    font-size: 1rem;
    margin-bottom: 0.3em;
    font-weight: 600;
    color: ${(p) => p.theme.palette.primary};
  }
`;
