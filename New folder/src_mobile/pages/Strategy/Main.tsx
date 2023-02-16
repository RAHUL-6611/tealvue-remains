import styled from 'styled-components';

import { Section } from 'styles/common';
import StrategyView from './StrategyView';

export default function Strategy() {
  return (
    <CustomSection>
      <StrategyView />
    </CustomSection>
  );
}

const CustomSection = styled(Section)`
  width: 100%;
  overflow-x: hidden;
`;
