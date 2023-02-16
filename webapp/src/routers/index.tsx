import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { customAxiosError } from '../interfaces';
import ChatPage from '../pages/Chat';
import DashboardPage from '../pages/Dashboard';
import ExpertAdvicePage from '../pages/ExpertAdvice';
import FuturePage from '../pages/Future';
import OpenInterestPage from '../pages/OpenInterest';
import OptionsPage from '../pages/Options';
import SocialTradePage from '../pages/SocialTrade';
import StrategyPage from '../pages/Strategy';
import VolitilePage from '../pages/Volitile';
import { useAppDispatch } from '../redux/hooks';
import { updateExpiryDates } from '../redux/slices/expiryDates';
import { updateStockList } from '../redux/slices/global';

function UserRouters() {
  const dispatch = useAppDispatch();

  const getExpiryData = async () => {
    try {
      const { data } = await axios.get('/v1/api/overview/expiry');

      dispatch(updateExpiryDates(data.data));
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const getStockList = async () => {
    try {
      const { data } = await axios.get('/v1/api/overview/constants');

      dispatch(updateStockList(data.data));
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const memoizedGetExpiryData = useCallback(getExpiryData, [dispatch]);
  const memoizedGetStockList = useCallback(getStockList, [dispatch]);
  // const auth = useAppSelector((state) => state.user.isAuth);

  useEffect(() => {
    memoizedGetExpiryData();
    memoizedGetStockList();
  }, [memoizedGetStockList, memoizedGetExpiryData]);

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/future" element={<FuturePage />} />
      <Route path="/option" element={<OptionsPage />} />
      <Route path="/strategy" element={<StrategyPage />} />
      <Route path="/open-interest" element={<OpenInterestPage />} />
      <Route path="/volitile" element={<VolitilePage />} />
      <Route path="/social-trade" element={<SocialTradePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/expert-advice" element={<ExpertAdvicePage />} />
    </Routes>
  );
}

export default UserRouters;
