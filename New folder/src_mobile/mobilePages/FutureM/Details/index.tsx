import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { useHistory, useParams } from 'react-router-dom';

import { SearchField, SelectWithTitle } from 'components';
import { Section, Top } from 'styles/common';
import { selectItemProps } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateActiveFuture } from 'redux/slices/expiryDates';
import Main from './Main';

export default function FutureScreener() {
  const params = useParams<{ type: string }>();
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const history = useHistory();

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

  useEffect(() => {
    const active = document.getElementById('active');
    if (active) active.innerText = params.type;
  }, [params]);

  return (
    <Section>
      <Top>
        <SearchField
          value={{ label: params.type, value: params.type }}
          onChange={(val) => {
            let temp = val as selectItemProps;
            history.push(`/future/screener/${temp?.label}`);
          }}
        />
        <SelectWithTitle
          title="Expire Date"
          options={expiryOptions}
          value={expiryOption}
          onChange={(val) => {
            if (val) dispatch(updateActiveFuture(val));
          }}
        />
      </Top>
      <Main expiryOption={expiryOption} />
    </Section>
  );
}
