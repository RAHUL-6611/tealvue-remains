import { useState } from 'react';

import { SearchField, Tab } from 'components';
import { Section, Top } from 'styles/common';
import IVGraph from './IVGraph';
import HVGraph from './HVGraph';

export default function VolatilityDashBoard() {
  const [tab, setTab] = useState(0);

  return (
    <Section>
      <Top>
        <SearchField />
      </Top>

      <Tab tab={tab} setTab={setTab} tabOptions={['IV Chart']} />
      {tab === 0 ? <IVGraph /> : <HVGraph />}
    </Section>
  );
}
