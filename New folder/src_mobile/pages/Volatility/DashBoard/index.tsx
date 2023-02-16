import { useState } from 'react';

import { SearchField, Tab } from 'components';
import { Section, Top } from 'styles/common';
// import HVGraph from './HVGraph';
import IVGraph from './IVGraph';

export default function VolatilityDashBoard() {
  const [tab, setTab] = useState(0);

  return (
    <Section>
      <Top>
        <SearchField />
      </Top>

      {/* tabOptions={['IV Chart', 'HV Chart']} */}
      <Tab tab={tab} setTab={setTab} tabOptions={['IV Chart']} />

      {tab === 0 ? <IVGraph /> : <></>}
    </Section>
  );
}
