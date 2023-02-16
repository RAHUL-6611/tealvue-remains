import { commonObject } from 'interfaces';

import { Container, Content } from '../style';
import PayOffChart from './PayoffChart';
import { useAppSelector } from 'redux/hooks';
import { Loader } from 'components';

export default function Main({
  loader,
  setTargetPrice,
  target,
}: {
  wholeData: commonObject;
  loader: boolean;
  setTargetPrice: React.Dispatch<React.SetStateAction<number>>;
  target: number;
}) {
  const tradesState = useAppSelector((state) => state.strategy.trade.values);

  return tradesState.length ? (
    <Container>
      <Content>
        {loader && <Loader />}

        <PayOffChart />
      </Content>
    </Container>
  ) : (
    <></>
  );
}
