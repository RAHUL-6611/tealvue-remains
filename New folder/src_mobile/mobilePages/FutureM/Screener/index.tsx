import { useEffect, useRef, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import Table from '../../../pages/Future/Screener/ScreenerTable';
import { Section, Top } from 'styles/common';
import { SelectWithTitle, Button } from 'components';
import { selectItemProps } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveFuture } from 'redux/slices/expiryDates';
import { activeItemProps, commonObject, customAxiosError, dashboardGraphProps, screenerLocation } from 'interfaces';
import { CSVLink, CSVDownload } from 'react-csv';
export const activeValues: activeItemProps[] = [
  {
    title: 'Most active by value',
    id: 'active_value',
    col: 'ttv',
  },
  {
    title: 'OI gainer',
    id: 'oi_gainer',
    col: 'oi_change',
  },
  {
    title: 'OI losers',
    id: 'oi_loser',
    col: 'oi_change',
  },
  {
    title: 'Contract gainers',
    id: 'contract_gainer',
    col: 'volume_change',
  },
  {
    title: 'Premium',
    id: 'premium',
    col: 'basis',
  },
  {
    title: 'Discount',
    id: 'discount',
    col: 'basis',
  },
  {
    title: 'Most active contracts',
    id: 'active_contracts',
    col: 'volume',
  },
  {
    title: 'Price Gainers',
    id: 'price_gainer',
    col: 'price_change',
  },
  {
    title: 'Price Losers',
    id: 'price_loser',
    col: 'price_change',
  },
];

export default function FutureScreener() {
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

  const expiryDates = useAppSelector((state) => state.expiryDates.future);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (expiryDates.length) {
      setExpiryOptions(
        expiryDates.map((data) => ({
          value: data,
          label: data,
        })),
      );
    }
  }, [expiryDates]);

  return (
    <Section>
      <Top style={{ justifyContent: 'space-between' }}>
        <SelectWithTitle
          title="Expire Date"
          options={expiryOptions}
          value={expiryOption}
          onChange={(val) => {
            if (val) dispatch(updateActiveFuture(val));
          }}
        />

        <Button ref={buttonRef}>
          {data && (
            <CSVLink data={data}>
              <span className="icon-cloud-download text-t1Primary"></span>
            </CSVLink>
          )}
        </Button>
      </Top>

      {/* <Table expiryOption={expiryOption} screenType="FUTURE" activeValues={activeValues} withActive setData={setData} data={data} /> */}
    </Section>
  );
}
