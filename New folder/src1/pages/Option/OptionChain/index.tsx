import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { SearchField, SelectWithTitle } from 'components';
import { Section, Top } from 'styles/common';
import Main from './Main';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { selectItemProps } from 'interfaces';
import { updateActiveOption } from 'redux/slices/expiryDates';

export default function OptionChain() {
  const params = useParams<{ type: string }>();
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const history = useHistory();

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
            history.push(`/option/screener/${temp?.label}`);
          }}
        />
        <SelectWithTitle
          title="Expire Date"
          options={expiryOptions}
          value={expiryOption}
          onChange={(val) => {
            if (val) dispatch(updateActiveOption(val));
          }}
        />
      </Top>
      <Main expiryOption={expiryOption} />
    </Section>
  );
}
