import styled from 'styled-components';

import { SearchField, SelectWithTitle } from 'components';
import { Section, Top } from 'styles/common';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveOption } from 'redux/slices/expiryDates';
import StrategyView from './StrategyView';

export default function Strategy() {
  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const dispatch = useAppDispatch();

  return (
    <CustomSection>
      <CustomTop>
        <SearchField />

        <SelectWithTitle
          title="Expire Date"
          options={expiryDates.map((date) => ({
            value: date,
            label: date,
          }))}
          value={expiryOption}
          onChange={(val) => {
            if (val) dispatch(updateActiveOption(val));
          }}
        />
      </CustomTop>

      <StrategyView />
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
