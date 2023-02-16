import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { SelectWithTitle } from 'components';
import { Section, Top } from 'styles/common';
import Map from './Map';
import { selectItemProps } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveFuture } from 'redux/slices/expiryDates';

const typeOptions = [
  { value: 'price', label: 'price' },
  { value: 'oi', label: 'OI' },
  { value: 'contracts', label: 'contracts' },
];

export default function FutureScreener() {
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const [active, setActive] = useState<selectItemProps>(typeOptions[0]);

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
        <Container>
          <SelectWithTitle
            title="Expire Date"
            options={expiryOptions}
            value={expiryOption}
            onChange={(val) => {
              if (val) dispatch(updateActiveFuture(val));
            }}
          />
          <SelectWithTitle
            title="Type"
            options={typeOptions}
            value={active}
            onChange={(val) => {
              if (val) setActive(val);
            }}
          />
        </Container>
      </Top>

      <Map type={active.value} expiryOption={expiryOption} />
    </Section>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
`;
