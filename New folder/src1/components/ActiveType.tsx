import { FunctionComponent } from 'react';
import styled from 'styled-components';

import { activeProps } from 'interfaces';
import { useAppDispatch } from '../redux/hooks';
import { updateStrategySelection } from '../redux/slices/global';

const ActiveType: FunctionComponent<activeProps> = ({ active, setActive, values, action, containerStyle, itemStyle, disabled }) => {
  const dipatch = useAppDispatch();

  return (
    <Container style={containerStyle}>
      {values.map((val, ind) => {
        return (
          <Item
            key={ind}
            style={itemStyle}
            active={active.id === val.id}
            disabled={!!disabled}
            onClick={() => {
              if (disabled) return;
              if (action) action(val);

              dipatch(
                updateStrategySelection({
                  label: val.title,
                  value: val.id,
                }),
              );

              setActive(val);
            }}
          >
            {val.title}
          </Item>
        );
      })}
    </Container>
  );
};

export default ActiveType;

const Container = styled.ul`
  display: flex;
  background-color: ${(p) => p.theme.palette.white};
  overflow: auto;
  /* padding: 0.5rem; */
  border-radius: ${(p) => p.theme.style.borderRadius};
`;

const Item = styled.li<{ active: boolean; disabled: boolean }>`
  padding: 0.5rem 1rem;
  color: ${(p) => p.theme.palette.white};
  border-radius: 1.5em;
  cursor: pointer;
  user-select: none;
  font-size: 0.8rem;
  font-weight: 400;
  transition: all 0.3s;
  background-color: ${(p) => (p.active ? p.theme.palette.primary : p.theme.palette.grey)};
  white-space: nowrap;
  font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};

  &:not(:last-child) {
    margin-right: 1em;
  }
`;
