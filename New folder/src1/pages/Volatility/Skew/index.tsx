import { SearchField, SelectWithTitle } from 'components';
import { selectItemProps } from 'interfaces';
import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { Section, Top } from 'styles/common';
import Graphs from './Graphs';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveOption } from 'redux/slices/expiryDates';
import { updateRequestType } from '../../../redux/slices/requestType';

export default function VolatilitySkew() {
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
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

  useEffect(() => {
    dispatch(
      updateRequestType({
        label: 'Option',
        value: 'OPTION',
      }),
    );
  }, [dispatch]);

  return (
    <Section>
      <Top>
        <SearchField title="SYMBOL" />

        <SelectWithTitle
          title="Expire Date"
          options={expiryOptions}
          value={expiryOption}
          onChange={(val) => {
            if (val) dispatch(updateActiveOption(val));
          }}
        />
      </Top>
      <Graphs />
    </Section>
  );
}
