import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import { Layout, Navigator } from 'components';
import { OptionDashBoard, OptionScreener, OptionChain } from 'pages';
import { useEffect } from 'react';
import { updateRequestType } from '../../redux/slices/requestType';
import { useAppDispatch } from '../../redux/hooks';

export default function Option() {
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
      <Navigator
        title="Option"
        items={[
          { title: 'Option DashBoard', path: `${path}/dashboard` },
          { title: 'Option Screener', path: `${path}/screener` },
        ]}
      />
      <Switch>
        <Route path={`${path}/dashboard`} exact component={OptionDashBoard} />
        <Route path={`${path}/screener`} exact component={OptionScreener} />
        <Route path={`${path}/screener/:type`} exact component={OptionChain} />
        <Route path="*">
          <Redirect to={`${path}/dashboard`} />
        </Route>
      </Switch>
    </Layout>
  );
}
