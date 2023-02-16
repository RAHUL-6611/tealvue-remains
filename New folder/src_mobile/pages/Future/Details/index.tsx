import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Section } from 'styles/common';
import { useAppSelector } from 'redux/hooks';

import Main from './Main';
import TopNavigation from '../../../components/Navigation/TopNavigation';

export default function FutureScreener() {
  const params = useParams<{ type: string }>();

  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);

  useEffect(() => {
    const active = document.getElementById('active');
    if (active) active.innerText = params.type;
  }, [params]);

  return (
    <Section>
      <TopNavigation />

      <Main expiryOption={expiryOption} />
    </Section>
  );
}
