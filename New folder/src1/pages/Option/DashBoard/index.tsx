import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { SelectWithTitle } from 'components';
import { Section, Top } from 'styles/common';
import Graphs from './Graphs';
import { selectItemProps } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveOption } from 'redux/slices/expiryDates';

export default function OptionDashBoard() {
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

  return (
    <Section>
      <Top>
        <SelectWithTitle
          title="Expire Date"
          options={expiryOptions}
          value={expiryOption}
          onChange={(val) => {
            if (val) dispatch(updateActiveOption(val));
          }}
        />
      </Top>
      <Graphs expiryOption={expiryOption} />
    </Section>
  );
}
