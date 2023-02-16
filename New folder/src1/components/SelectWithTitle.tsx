import styled from 'styled-components';

import { selectWithTextProps } from 'interfaces';
import Select from './Select';

export default function SelectWithTitle({ title, ...props }: selectWithTextProps) {
  return (
    <Div>
      {/* <h6>{title}</h6> */}
      <Select {...props} />
    </Div>
  );
}

const Div = styled.div`
  /* display: flex; */
  h6 {
    font-size: 1rem;
    margin-bottom: 0.3em;
    font-weight: 600;
    color: ${(p) => p.theme.palette.primary};
  }
`;
