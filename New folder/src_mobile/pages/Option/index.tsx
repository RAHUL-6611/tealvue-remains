import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Layout } from 'components';
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
      <Switch>
        <Route path={`${path}/dashboard`} exact component={OptionDashBoard} />
        <Route path={`${path}/screener`} exact component={OptionScreener} />
        <Route path={`${path}/chain`} exact component={OptionChain} />
      </Switch>
    </Layout>
  );
}
