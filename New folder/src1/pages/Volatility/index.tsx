import { Layout, Navigator } from 'components';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { VolatilityDashBoard, VolatilitySkew } from 'pages';

export default function Volatility() {
  const { path } = useRouteMatch();

  return (
    <Layout>
      <Navigator
        title="Volatility"
        items={[
          { title: 'Dashboard', path: `${path}/dashboard` },
          { title: 'Skew', path: `${path}/skew` },
        ]}
      />

      <Switch>
        <Route path={`${path}/dashboard`} exact component={VolatilityDashBoard} />
        <Route path={`${path}/skew`} exact component={VolatilitySkew} />
        <Route path="*">
          <Redirect to={`${path}/dashboard`} />
        </Route>
      </Switch>
    </Layout>
  );
}
