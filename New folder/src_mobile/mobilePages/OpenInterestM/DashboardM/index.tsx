import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';

import { ActiveType } from 'components';
import { Section, ChartContainer, Top } from 'styles/common';
import { activeItemProps } from 'interfaces';
import OpenInterestGraph from './OpenInterestGraph';
import OIBuildup from './OIBuildup';
import OIBuildupp from './OIBuildupp';

const activeValues: activeItemProps[] = [
  { title: 'OPEN INTEREST', id: 'open-interest' },
  { title: 'OI BUILDUP', id: 'oi-buildup' },
];

export default function OpenInterestDashboard() {
  const [oi, setOi] = useState<activeItemProps>(activeValues[0]);

  const global = useAppSelector((state) => state.global);

  const oiValues: activeItemProps[] = [
    { title: `Spot Price: ${global.stock.cash}`, id: global.stock.cash.toString() },
    { title: `Future Price: ${global.stock.close}`, id: global.stock.close.toString() },
    { title: `Lot Size: ${global.stock.lotsize}`, id: global.stock.lotsize.toString() },
    { title: `PCR: ${global.stock.pcr_oi.toFixed(2)}`, id: global.stock.pcr_oi.toFixed(2).toString() },
  ];
  const [details, setDetails] = useState<activeItemProps>(oiValues[0]);

  return (
    <Section>
      <Top>
        <ActiveType values={oiValues} {...{ active: details, setActive: setDetails }} />
      </Top>
      <ChartContainer>
        <ActiveType values={activeValues} {...{ active: oi, setActive: setOi }} />
        {oi.id === 'open-interest' ? <OpenInterestGraph /> : <OIBuildup/>}
      </ChartContainer>
    </Section>
  );
}
