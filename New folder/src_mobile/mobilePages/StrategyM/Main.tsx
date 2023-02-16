import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import styled from 'styled-components';

import { SearchField, SelectWithTitle } from 'components';
import { Section, Top } from 'styles/common';
import { selectItemProps } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveOption } from 'redux/slices/expiryDates';
import StrategyDashBoard from './StrategyDashBoard';
import StrategyView from './StrategyView';

export default function Strategy({ dashBoard }: { dashBoard: boolean }) {
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
    <CustomSection>
      <CustomTop>
        <SearchField />

        <SelectWithTitle
          title="Expire Date"
          options={expiryOptions}
          value={expiryOption}
          onChange={(val) => {
            if (val) dispatch(updateActiveOption(val));
          }}
        />
      </CustomTop>

      {dashBoard ? <StrategyDashBoard /> : <StrategyView />}
    </CustomSection>
  );
}

const CustomSection = styled(Section)`
  width: 100%;
  overflow-x: hidden;
`;
const CustomTop = styled(Top)`
  justify-content: flex-start;
`;
