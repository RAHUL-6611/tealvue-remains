import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Main from './Main';
import { useAppSelector } from 'redux/hooks';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { selectItemProps } from 'interfaces';
import TopNavigation from '../../../components/Navigation/TopNavigation';

export default function OptionChain() {
  const params = useParams<{ type: string }>();
  const [expiryOptions, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);

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
    <div className="p-2">
      <TopNavigation />

      <Main />
    </div>
  );
}