import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
import useDimensions from '../hooks/useDimensions';
import { Future, Login, SignUp, Option, Strategy, Volatility, OpenInterest, Profile } from 'pages';
import { FutureM, LoginM, SignUpM, OptionM, StrategyM, VolatilityM, OpenInterestM, ProfileM, DashBoard } from '../mobilePages';
import { customAxiosError } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateExpiryDates } from 'redux/slices/expiryDates';
import { updateStockList } from 'redux/slices/global';
import ChartDashboard from '../pages/Chart';
import ProfileSection from "../pages/ProfileSection"

function Router() {
  const dispatch = useAppDispatch();
  const { dimension } = useDimensions();
  const activeStock = useAppSelector((state) => state.global.stock.value);
  const requestType = useAppSelector((state) => state.requestType.value);

  const getExpiryData = async () => {
    try {
      const { data } = await axios.get(`/v1/api/overview/expiry?symbol=${activeStock.value}&type=${requestType.toLowerCase()}`);

      dispatch(updateExpiryDates(data.data));
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const getStockList = async () => {
    try {
      const { data } = await axios.get(`/v1/api/overview/constants`);

      dispatch(updateStockList(data.data));
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const memoizedGetExpiryData = useCallback(getExpiryData, [activeStock.value, dispatch, requestType]);
  const memoizedGetStockList = useCallback(getStockList, [dispatch]);
  // const auth = useAppSelector((state) => state.user.isAuth);

  useEffect(() => {
    memoizedGetStockList();
  }, [memoizedGetStockList]);

  useEffect(() => {
    memoizedGetExpiryData();
  }, [memoizedGetExpiryData]);

  return (
    <>
      <Switch>
        {dimension.width > 500 ? (
          <>
            <Route path="/login" exact component={Login} />
            <Route path="/signUp" exact component={SignUp} />
            <Route path="/future" component={Future} />
            <Route path="/option" component={Option} />
            <Route path="/strategy" component={Strategy} />
            <Route path="/volatility" component={Volatility} />
            <Route path="/open-interest" component={OpenInterest} />
            <Route path="/profile" component={ProfileSection} />
            <Route path="/chart" component={ChartDashboard} />
            <Route path="/*" component={Future} />
              {/* <Redirect to="/future/dashboard" /> */}
            {/* </Route> */}
          </>
        ) : (
          <>
            <Route path="/login" exact component={LoginM} />
            <Route path="/signUp" exact component={SignUpM} />
            <Route path="/DashBoard" exact component={DashBoard} />
            <Route path="/future" component={FutureM} />
            <Route path="/option" component={OptionM} />
            <Route path="/strategy" component={StrategyM} />
            <Route path="/volatility" component={VolatilityM} />
            <Route path="/open-interest" component={OpenInterestM} />
            <Route path="/profile" component={ProfileM} />

            <Route path="*">
              <Redirect to="/DashBoard" />
            </Route>
          </>
        )}
      </Switch>
    </>
  );
}

export default Router;
