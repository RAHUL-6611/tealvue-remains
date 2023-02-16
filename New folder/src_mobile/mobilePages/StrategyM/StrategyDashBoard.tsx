import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { ActiveType } from 'components';
import { activeItemProps, strategyType } from 'interfaces';
import { types } from './data';

const activeValues: activeItemProps[] = [
  { title: 'ALL', id: 'all' },
  { title: 'BULLISH', id: 'bullish' },
  { title: 'BEARISH', id: 'bearish' },
  { title: 'NEUTRAL', id: 'neutral' },
  { title: 'VOLATILE', id: 'volatile' },
];

export default function StrategyDashBoard() {
  const [active, setActive] = useState<activeItemProps>(activeValues[0]);
  const history = useHistory();
  const { path } = useRouteMatch();
  const [items, setItems] = useState<strategyType[]>([]);

  useEffect(() => {
    if (active.id === 'all') {
      setItems(types);
    } else {
      setItems(types.filter((ty) => ty.type === active.id));
    }
  }, [active]);

  return (
    <>
      <ActiveType values={activeValues} {...{ active, setActive }} />

      <Section>
        {items.map((type, ind) => {
          return (
            <Item
              key={ind}
              onClick={() =>
                history.push(`${path}/view`, {
                  type: type.path,
                })
              }
            >
              <h3>{type.title}</h3>
              <div>
                <img src={`/assets/strategy/${type.image}.png`} alt={type.title} />
              </div>
            </Item>
          );
        })}
      </Section>
    </>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  padding: 1.5rem 0 0 0;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${(p) => p.theme.style.borderRadius};
  box-shadow: ${(p) => p.theme.style.boxShadow};
  padding: 1rem;
  height: 100px;
  cursor: pointer;

  h3 {
    color: ${(p) => p.theme.palette.secondary};
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  }

  img {
    width: 100%;
    max-width: 100px;
  }
`;
