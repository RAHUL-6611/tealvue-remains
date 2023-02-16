import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Layout } from 'components';
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
      <div className="max-h-screen overflow-scroll no-scrollbar">
        <Switch>
          <Route path={`${path}/dashboard`} exact component={FutureDashBoard} />
          <Route path={`${path}/heatmap`} exact component={FutureHashMap} />
          <Route path={`${path}/screener`} exact component={FutureScreener} />
          <Route path={`${path}/screener/:type`} exact component={FutureDetails} />
          <Route path={`${path}/*`} exact component={FutureDashBoard} />
        </Switch>
      </div>
    </Layout>
  );
}
