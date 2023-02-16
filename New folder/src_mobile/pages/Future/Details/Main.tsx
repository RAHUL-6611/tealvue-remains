import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Loader } from 'components';
import SecondPart from './SecondPart';
import { commonObject, customAxiosError, dashboardGraphProps } from 'interfaces';
import Graphs from './Graphs';
import { floatFormatter } from 'functions';

export default function Main({ expiryOption }: dashboardGraphProps) {
  const { type } = useParams<{ type: string }>();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<commonObject>({});

  const getData = async (type: string, expiry_at: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/v1/api/stock/${type}?expiry_at=${expiry_at}`);

      setDetails(data);

      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const memoizedGetData = useCallback(getData, []);

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData(type, expiryOption.value);
    }
  }, [memoizedGetData, expiryOption, type]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Section>
            <SecondPart data={details} />
            {/* <Derivatives/> */}
          <Graphs data={details} expiryDate={expiryOption.value} />
        </Section>
      )}
    </>
  );
}

const Section = styled.section`
  background-color: ${(p) => p.theme.palette.white};
  width: 100%;
  border-radius: ${(p) => p.theme.style.borderRadius};
  box-shadow: ${(p) => p.theme.style.boxShadow};
  padding: 2em;
  display:flex;
  flex-direction:column;
  gap: 1em;
`;

const Top = styled.div`
  h1 {
    font-size: 2rem;
    color: ${(p) => p.theme.palette.primary};
  }

  ul {
    display: flex;
    align-items: center;
    margin-top: 1em;

    li {
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: ${(p) => p.theme.style.borderRadius};
      padding: 1em 1.5em;
      background-color: ${(p) => p.theme.palette.primary};
      color: ${(p) => p.theme.palette.white};
      &:not(:first-child) {
        margin-left: 1em;
      }
    }
  }
`;
