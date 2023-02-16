import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

import Map from './Map';
import { selectItemProps } from 'interfaces';
import TopNavigation from '../../../components/Navigation/TopNavigation';
import { useAppSelector } from '../../../redux/hooks';
const typeOptions = [
  { value: 'price', label: 'price' },
  { value: 'oi', label: 'OI' },
  { value: 'contracts', label: 'contracts' },
];

export default function HeatMap() {
  const [, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const [active] = useState<selectItemProps>(typeOptions[0]);

  const expiryDates = useAppSelector((state) => state.expiryDates.future);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);

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

      <Map type={active.value} expiryOption={expiryOption} />
    </div>
  );
}
