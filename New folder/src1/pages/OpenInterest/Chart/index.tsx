import { useState } from 'react';
import { Switch } from '@headlessui/react';

import { ActiveType } from 'components';
import { activeItemProps } from 'interfaces';
import { ChartContainer, Section } from 'styles/common';
import MultiOI from './MultiOI';
import OIandGC from './OIandGC';

const activeValues: activeItemProps[] = [
  { title: 'GREEKS CHARTS', id: 'oi-gc' },
  // { title: 'MULTI OI', id: 'multi-oi' },
];

export default function OpenInterestChart() {
  const [active, setActive] = useState<activeItemProps>(activeValues[0]);
  const [optionType, setOptionType] = useState<boolean>(true);

  return (
    <Section>
      <ChartContainer>
        <div className="flex justify-between items-center">
          <ActiveType values={activeValues} {...{ active, setActive }} />

          <div className="flex justify-center items-center gap-4">
            <span>{optionType ? 'Call' : 'Put'}</span>
            <Switch
              checked={optionType}
              onChange={setOptionType}
              className={`${optionType ? 'bg-primary' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span className="sr-only">Enable notifications</span>
              <span className={`${optionType ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`} />
            </Switch>
          </div>
        </div>

        {active.id === 'oi-gc' ? <OIandGC {...{ optionType }} /> : <MultiOI />}
      </ChartContainer>
    </Section>
  );
}
