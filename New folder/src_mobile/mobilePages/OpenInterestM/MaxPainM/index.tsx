import { useState } from 'react';

import { useAppSelector } from 'redux/hooks';
import { activeItemProps } from 'interfaces';
import { Section, Top } from 'styles/common';
import { ActiveType } from 'components';
import Graphs from './Graphs';

export default function OpenInterestMaxPain() {
  const global = useAppSelector((state) => state.global);

  const activeValues: activeItemProps[] = [
    { title: `Spot Price: ${global.stock.cash}`, id: global.stock.cash.toString() },
    { title: `Future Price: ${global.stock.close}`, id: global.stock.close.toString() },
    { title: `Max Pain Strike: ${global.stock.maxpain}`, id: global.stock.maxpain.toString() },
    { title: `PCR: ${global.stock.pcr_oi.toFixed(2)}`, id: global.stock.pcr_oi.toFixed(2).toString() },
  ];
  const [active, setActive] = useState<activeItemProps>(activeValues[0]);

  return (
    <Section>
      <Top>
        <ActiveType values={activeValues} {...{ active, setActive }} />
      </Top>
      <Graphs />
    </Section>
  );
}
