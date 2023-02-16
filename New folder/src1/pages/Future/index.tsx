import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { Layout, Navigator } from 'components';
import { FutureDashBoard, FutureHashMap, FutureScreener, FutureDetails } from 'pages';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { updateRequestType } from '../../redux/slices/requestType';

export default function Future() {
  const { path } = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateRequestType({
        label: 'Future',
        value: 'FUTURE',
      }),
    );
  }, [dispatch]);

  return (
    <Layout>
      <Navigator
        title="Future"
        items={[
          { title: 'Future DashBoard', path: `${path}/dashboard` },
          { title: 'Future Screener', path: `${path}/screener` },
          { title: 'Future HeatMap', path: `${path}/heatmap` },
        ]}
      />

      <Switch>
        <Route path={`${path}/dashboard`} exact component={FutureDashBoard} />
        <Route path={`${path}/heatmap`} exact component={FutureHashMap} />
        <Route path={`${path}/screener`} exact component={FutureScreener} />
        <Route path={`${path}/screener/:type`} exact component={FutureDetails} />
        <Route path="*">
          <Redirect to={`${path}/dashboard`} />
        </Route>
      </Switch>
    </Layout>
  );
}
