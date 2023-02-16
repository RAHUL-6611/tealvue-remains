import { SearchField, SelectWithTitle } from 'components';
import { selectItemProps } from 'interfaces';
import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { Section, Top } from 'styles/common';
import Graphs from './Graphs';
import Graphh from './Graphh';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveFuture } from 'redux/slices/expiryDates';

export default function VolatilitySkew() {
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const expiryDates = useAppSelector((state) => state.expiryDates.future);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);
  const dispatch = useAppDispatch();

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
      <Top>
        <SearchField title="SYMBOL" />
        <SelectWithTitle
          title="Expire Date"
          options={expiryOptions}
          value={expiryOption}
          onChange={(val) => {
            if (val) dispatch(updateActiveFuture(val));
          }}
        />
        {/* <Button style={{ padding: '1rem 2rem' }}>Go</Button>
        <Button style={{ padding: '1rem 2rem' }}>Auto Refresh</Button> */}
      </Top>
      <div className="w-full h-full">
      <Graphh />
      </div>
      
    </Section>
  );
}
