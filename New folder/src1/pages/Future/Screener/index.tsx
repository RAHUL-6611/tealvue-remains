import { useEffect, useRef, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { Section, Top } from 'styles/common';
import { SelectWithTitle, Button } from 'components';
import { selectItemProps } from 'interfaces';
import FutureScreenerTable from './FutureScreenerTable';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveFuture } from 'redux/slices/expiryDates';

export default function FutureScreener() {
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

  const expiryDates = useAppSelector((state) => state.expiryDates.future);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);
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
            if (val) dispatch(updateActiveFuture(val));
          }}
        />

        <Button ref={buttonRef}>
          <span className="icon-cloud-download text-t1Primary"></span>
        </Button>
      </Top>

      <FutureScreenerTable buttonRef={buttonRef} expiryOption={expiryOption} />
    </Section>
  );
}
