import { useEffect, useRef, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import Table from '../../../pages/Future/Screener/ScreenerTable';
import { SelectWithTitle, Button } from 'components';
import { selectItemProps } from 'interfaces';
import { Section, Top } from 'styles/common';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveOption } from 'redux/slices/expiryDates';
import { activeItemProps, commonObject, customAxiosError, dashboardGraphProps, screenerLocation } from 'interfaces';
import { CSVLink, CSVDownload } from 'react-csv';
const activeValues: activeItemProps[] = [
  {
    title: 'Most Active Calls',
    id: 'active_value_calls',
    col: 'ttv',
  },
  {
    title: 'Most Active Puts',
    id: 'active_value_puts',
    col: 'ttv',
  },
  {
    title: 'OI Gainer Calls',
    id: 'oi_gainer_calls',
    col: 'oi_change',
  },
  {
    title: 'OI Gainer Puts',
    id: 'oi_gainer_puts',
    col: 'oi_change',
  },
  {
    title: 'OI Loser Calls',
    id: 'oi_loser_calls',
    col: 'oi_change',
  },
  {
    title: 'OI Loser Puts',
    id: 'oi_loser_puts',
    col: 'oi_change',
  },
  {
    title: 'Contract Gainer Calls',
    id: 'contract_gainer_calls',
    col: 'volume_change',
  },
  {
    title: 'Contract Gainer Puts',
    id: 'contract_gainer_puts',
    col: 'volume_change',
  },
  {
    title: 'Price Gainers',
    id: 'price_gainer',
    col: 'day_change',
  },
  {
    title: 'Price Losers',
    id: 'price_loser',
    col: 'day_change',
  },
  {
    title: 'IV Gainers',
    id: 'iv_raise',
    col: '',
  },
  {
    title: 'IV Losers',
    id: 'iv_fall',
    col: '',
  },
];

export default function OptionScreener() {
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
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
            if (val) dispatch(updateActiveOption(val));
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

      {/* <ScreenerTable buttonRef={buttonRef} expiryOption={expiryOption} /> */}
      {/* <Table expiryOption={expiryOption} screenType="OPTION" activeValues={activeValues} withActive={false} setData={setData} data={data} /> */}
    </Section>
  );
}
