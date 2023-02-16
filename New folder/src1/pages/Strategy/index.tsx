import { useRouteMatch } from 'react-router-dom';

import { Layout, Navigator } from 'components';
import { StrategyDashBoard } from 'pages';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { updateRequestType } from '../../redux/slices/requestType';

export default function Strategy() {
  const { path } = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateRequestType({
        label: 'Option',
        value: 'OPTION',
      }),
    );
  }, [dispatch]);

  return (
    <Layout>
      <Navigator title="Strategy" items={[{ title: 'DashBoard', path: `${path}/dashboard` }]} />

      <StrategyDashBoard />
    </Layout>
  );
}
