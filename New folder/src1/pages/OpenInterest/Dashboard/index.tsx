import { useState } from 'react';
import { ActiveType } from 'components';
import { ChartContainer } from 'styles/common';
import { activeItemProps } from 'interfaces';
import CallPutOi from './CPOI';
import OIBuildup from './OIBuildup';
import CPOIChange from './CPOIChange';

const activeValues: activeItemProps[] = [
  { title: 'OI Value', id: 'oi-value' },
  { title: 'OI Change', id: 'oi-change' },
  { title: 'OI BUILDUP', id: 'oi-buildup' },
];

export default function OpenInterestDashboard() {
  const [oi, setOi] = useState<activeItemProps>(activeValues[0]);

  return (
    <div>
      <ChartContainer>
        <ActiveType values={activeValues} {...{ active: oi, setActive: setOi }} />

        {oi.id === 'oi-value' && <CallPutOi />}

        {oi.id === 'oi-change' && <CPOIChange />}

        {oi.id === 'oi-buildup' && <OIBuildup />}
      </ChartContainer>
    </div>
  );
}
