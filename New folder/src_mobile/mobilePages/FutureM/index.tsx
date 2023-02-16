import { Switch, Route, useRouteMatch } from 'react-router-dom';

import FutureDashBoardM from '../FutureM/DashBoard';
import FutureHashMapM from '../FutureM/HeatMap';
import FutureDetailsM from '../FutureM/Details';
import FutureScreenerM from '../FutureM/Screener';
import NavigationBox from '../components/NavigationBox';
import BottomNav from '../components/BottomNav';
import Navigator from '../components/Navigator';

export default function FutureM() {
  const { path } = useRouteMatch();

  return (
    <>
      <div className="flex flex-col bg-teal-400 rounded-br-2xl rounded-bl-2xl text-white h-40 fixed w-full z-[100] shadow-3xl">
        <NavigationBox title="Future DashBoard" header={true} leftIcon="arrow" rightIcon="dots-three" />
        <Navigator />
      </div>
      <div className="h-40 w-full"></div>
      <div className="mb-20">
        <Switch>
          <Route path={`${path}/dashboard`} exact component={FutureDashBoardM} />
          <Route path={`${path}/screener`} exact component={FutureScreenerM} />
          <Route path={`${path}/heatmap`} exact component={FutureHashMapM} />
          <Route path={`${path}/screener/:type`} exact component={FutureDetailsM} />
        </Switch>
      </div>
      <div>
        <BottomNav />
      </div>
    </>
  );
}
