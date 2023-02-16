import { useEffect } from 'react';
import ScreenerTable from '../../Future/Screener/ScreenerTable';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectItemProps } from 'interfaces';
import { updateScreenerList } from '../../../redux/slices/requestType';
import TopNavigation from '../../../components/Navigation/TopNavigation';

const activeValues: selectItemProps[] = [
  {
    label: 'Most Active Calls',
    value: 'active_value_calls',
    // col: 'ttv',
  },
  {
    label: 'Most Active Puts',
    value: 'active_value_puts',
    // col: 'ttv',
  },
  {
    label: 'OI Gainer Calls',
    value: 'oi_gainer_calls',
    // col: 'oi_change',
  },
  {
    label: 'OI Gainer Puts',
    value: 'oi_gainer_puts',
    // col: 'oi_change',
  },
  {
    label: 'OI Loser Calls',
    value: 'oi_loser_calls',
    // col: 'oi_change',
  },
  {
    label: 'OI Loser Puts',
    value: 'oi_loser_puts',
    // col: 'oi_change',
  },
  {
    label: 'Contract Gainer Calls',
    value: 'contract_gainer_calls',
    // col: 'volume_change',
  },
  {
    label: 'Contract Gainer Puts',
    value: 'contract_gainer_puts',
    // col: 'volume_change',
  },
  {
    label: 'Price Gainers',
    value: 'price_gainer',
    // col: 'day_change',
  },
  {
    label: 'Price Losers',
    value: 'price_loser',
    // col: 'day_change',
  },
  {
    label: 'IV Gainers',
    value: 'iv_raise',
    // col: '',
  },
  {
    label: 'IV Losers',
    value: 'iv_fall',
    // col: '',
  },
];

export default function OptionScreener() {
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateScreenerList(activeValues));
  }, [dispatch]);

  return (
    <div className="p-2">
      <TopNavigation isScreenerDropDown />

      <ScreenerTable expiryOption={expiryOption} screenType="OPTION" />
    </div>
  );
}
