import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

import Graphs from './Graphs';
import { selectItemProps } from 'interfaces';
import { useAppSelector } from 'redux/hooks';
import TopNavigation from '../../../components/Navigation/TopNavigation';
export default function OptionDashBoard() {
  const [, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

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

  return (
    <div className="p-2">
      <TopNavigation />

      <Graphs expiryOption={expiryOption} />
    </div>
  );
}
