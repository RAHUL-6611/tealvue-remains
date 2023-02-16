import { useEffect } from 'react';
import ScreenerTable from './ScreenerTable';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectItemProps } from 'interfaces';
import { updateScreenerList } from '../../../redux/slices/requestType';
import TopNavigation from '../../../components/Navigation/TopNavigation';

export const activeValues: selectItemProps[] = [
  {
    label: 'Most active by value',
    value: 'active_value',
    // col: 'ttv',
  },
  {
    label: 'OI gainer',
    value: 'oi_gainer',
    // col: 'oi_change',
  },
  {
    label: 'OI losers',
    value: 'oi_loser',
    // col: 'oi_change',
  },
  {
    label: 'Contract gainers',
    value: 'contract_gainer',
    // col: 'volume_change',
  },
  {
    label: 'Premium',
    value: 'premium',
    // col: 'basis',
  },
  {
    label: 'Discount',
    value: 'discount',
    // col: 'basis',
  },
  {
    label: 'Most active contracts',
    value: 'active_contracts',
    // col: 'volume',
  },
  {
    label: 'Price Gainers',
    value: 'price_gainer',
    // col: 'price_change',
  },
  {
    label: 'Price Losers',
    value: 'price_loser',
    // col: 'price_change',
  },
];

export default function FutureScreener() {
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateScreenerList(activeValues));
  }, [dispatch]);

  return (
    <div className="p-2">
      <TopNavigation isScreenerDropDown />

      <div className="max-h-screen overflow-scroll no-scrollbar">
        <ScreenerTable expiryOption={expiryOption} screenType="FUTURE" />
      </div>
    </div>
  );
}
