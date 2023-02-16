import { useEffect, useRef, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { SelectWithTitle, Button } from 'components';
import { selectItemProps } from 'interfaces';
import { Section, Top } from 'styles/common';
import ScreenerTable from './ScreenerTable';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveOption } from 'redux/slices/expiryDates';

export default function OptionScreener() {
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const dispatch = useAppDispatch();

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
          <span className="icon-cloud-download text-t1Primary"></span>
        </Button>
      </Top>

      <ScreenerTable buttonRef={buttonRef} expiryOption={expiryOption} />
    </Section>
  );
}
