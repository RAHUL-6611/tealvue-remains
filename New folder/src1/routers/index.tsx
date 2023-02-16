import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Future, Login, SignUp, Option, Strategy, Volatility, OpenInterest, Profile } from 'pages';
import { customAxiosError } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateExpiryDates } from 'redux/slices/expiryDates';
import { updateStockList } from 'redux/slices/global';

function Router() {
  const dispatch = useAppDispatch();
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
        {/* <Route path="/" exact component={LandingPage} /> */}
        <Route path="/login" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />

        {/* {auth ? ( */}
        {/* <> */}
        <Route path="/future" component={Future} />
        <Route path="/option" component={Option} />
        <Route path="/strategy" component={Strategy} />
        <Route path="/volatility" component={Volatility} />
        <Route path="/open-interest" component={OpenInterest} />
        {/* <Route path="/volatility" component={Volatility} /> */}
        {/* <Route path="/open-interest" component={OpenInterest} /> */}
        <Route path="/profile" component={Profile} />

        {/* </> */}
        {/* ) : ( */}
        <Route path="*">
          <Redirect to="/future" />
        </Route>
        {/* )} */}
      </Switch>
    </>
  );
}

export default Router;
