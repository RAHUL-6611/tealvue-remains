import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { Layout, Navigator } from 'components';
import { StrategyDashBoard } from 'pages';

export default function Strategy() {
  const { path } = useRouteMatch();

  return (
    <Layout>
      <Navigator title="Strategy" items={[{ title: 'DashBoard', path: `${path}/dashboard` }]} />
      <Switch>
        <Route path={`${path}/dashboard`} exact>
          <StrategyDashBoard
            // dashBoard
          />
        </Route>

        <Route path={`${path}/dashboard/view`}>
          <StrategyDashBoard
            // dashBoard={false}
          />
        </Route>

        <Route path="*">
          <Redirect to={`${path}/dashboard`} />
        </Route>
      </Switch>
    </Layout>
  );
}
