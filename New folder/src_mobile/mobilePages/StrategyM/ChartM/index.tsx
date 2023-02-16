import { commonObject } from 'interfaces';
// import { useState } from 'react';
// import styled from 'styled-components';

import { Container, Content } from '../style';
// import Greeks from './Greeks';
import PayOffChart from './PayoffChart';
import StrategySlider from '../StrategySlider';
import { useAppSelector } from 'redux/hooks';
import { Loader } from 'components';

export default function Main({
  wholeData,
  loader,
  setTargetPrice,
  target,
}: {
  wholeData: commonObject;
  loader: boolean;
  setTargetPrice: React.Dispatch<React.SetStateAction<number>>;
  target: number;
}) {
  // const [page, setPage] = useState(1);
  const tradesState = useAppSelector((state) => state.strategy.trade.values);

  return tradesState.length ? (
    <Container>
      <Content>
        {loader && <Loader />}

        <StrategySlider {...{ wholeData, target, setTargetPrice }} />

        <PayOffChart data={wholeData} />
      </Content>
    </Container>
  ) : (
    <></>
  );
}

// const CustomTop = styled(Top)`
//   div {
//     display: flex;
//     align-items: center;
//     /* gap: 1em; */
//   }
// `;

// const Button = styled.button<{ active: boolean }>`
//   font-size: 1.1rem !important;
//   border-radius: 2rem !important;
//   user-select: none;
//   background-color: ${(p) => (p.active ? p.theme.palette.white : p.theme.palette.grey)} !important;
// `;
