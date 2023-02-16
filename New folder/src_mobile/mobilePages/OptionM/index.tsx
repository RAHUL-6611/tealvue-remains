import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom';

import { OptionDashBoard, OptionScreener, OptionChain } from 'pages';
import { AnimatePresence } from 'framer-motion';
import NavigationBox from '../components/NavigationBox';
import BottomNav from '../components/BottomNav';
import Navigator from '../components/Navigator';

export default function Option() {
  const { path } = useRouteMatch();
    const location = useLocation();

  return (
    <>
      <div className="flex flex-col bg-teal-400 rounded-br-2xl rounded-bl-2xl text-white h-40 fixed z-10 w-full">
        <NavigationBox title="Option DashBoard" header={true} leftIcon="arrow" rightIcon="dots-three" />
        <Navigator />
      </div>
      <div className="h-40 w-full"></div>
      <div className="mb-20">
          <Switch location={location} key={location.pathname}>
            <Route path={`${path}/dashboard`} exact component={OptionDashBoard} />
            <Route path={`${path}/screener`} exact component={OptionScreener} />
            <Route path={`${path}/screener/:type`} exact component={OptionChain} />
            <Route path="*">
              <Redirect to={`${path}/dashboard`} />
            </Route>
          </Switch>
      </div>

      <div>
        <BottomNav />
      </div>
    </>
  );
}
