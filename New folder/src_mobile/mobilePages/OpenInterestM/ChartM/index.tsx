import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';

import { ActiveType } from 'components';
import { activeItemProps } from 'interfaces';
import { ChartContainer, Section, Top } from 'styles/common';
import MultiOI from './MultiOI';
import OIandGC from './OIandGC';

const activeValues: activeItemProps[] = [
  { title: 'OPEN INTEREST & GREEKS CHARTS', id: 'oi-gc' },
  { title: 'MULTI OI', id: 'multi-oi' },
];

export default function OpenInterestChart() {
  const [active, setActive] = useState<activeItemProps>(activeValues[1]);

  const global = useAppSelector((state) => state.global);

  const oiValues: activeItemProps[] = [{ title: `Future Price: ${global.stock.close}`, id: global.stock.close.toString() }];
  const [details, setDetails] = useState<activeItemProps>(oiValues[0]);

  return (
    <Section>
      <Top>
        <ActiveType values={oiValues} {...{ active: details, setActive: setDetails }} />
      </Top>
      <ChartContainer>
        <ActiveType values={activeValues} {...{ active, setActive }} />
        {active.id === 'oi-gc' ? <OIandGC /> : <MultiOI />}
      </ChartContainer>
    </Section>
  );
}
