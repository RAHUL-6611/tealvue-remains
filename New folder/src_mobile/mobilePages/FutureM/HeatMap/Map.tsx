import { useEffect, useState } from 'react';
import axios from 'axios';

import { perFormatter } from 'functions';
import { activeItemProps, commonObject, customAxiosError, dashboardGraphProps } from 'interfaces';
import styled from 'styled-components';
import { ActiveType, Loader } from 'components';

interface props extends dashboardGraphProps {
  type: string;
}

const activeValues: activeItemProps[] = [
  {
    title: 'All',
    id: 'all',
  },
  {
    title: 'Long',
    id: 'long',
  },
  {
    title: 'Long Unwinding',
    id: 'longunwinding',
  },
  {
    title: 'Short',
    id: 'short',
  },
  {
    title: 'Short Covering',
    id: 'shortcovering',
  },
];

const types = [
  { key: 'price', calc: 'fcp', render1: 'price', render2: 'fcp' },
  { key: 'oi', calc: 'oi_change', render1: 'open_interest', render2: 'oi_change' },
  { key: 'contracts', calc: 'contracts_change', render1: 'contracts', render2: 'contracts_change' },
];

export default function Map({ type, expiryOption }: props) {
  const [loading, setLoading] = useState(true);
  const [mapData, setMapData] = useState<commonObject>({});
  const [renderType, setRenderType] = useState(types[0]);
  const [active, setActive] = useState<activeItemProps>(activeValues[0]);

  const getData = async (expiry_at: string, type: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`v1/api/overview/heatmap?expiry_at=${expiry_at}&field=${type}`);

      setMapData(data.data);

      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  useEffect(() => {
    if (expiryOption.value) getData(expiryOption.value, type);
  }, [expiryOption.value, type]);

  useEffect(() => {
    setRenderType(types.find((val) => val.key === type) ?? types[0]);
  }, [type]);

  return (
    <>
      <ActiveType values={activeValues} {...{ active, setActive }} />

      {loading && <Loader />}

      <MapList>
        {mapData[active.id]?.map((val: commonObject, ind: number) => {
          return (
            <Item
              key={ind}
              negative={parseInt(val[renderType.calc], 10) < 0}
              per={Math.round(
                (parseInt(val[renderType.calc], 10) /
                  (parseInt(val[renderType.calc], 10) < 0
                    ? parseInt(mapData[active.id][mapData[active.id].length - 1][renderType.calc], 10)
                    : parseInt(mapData[active.id][0][renderType.calc], 10))) *
                  100,
              )}
            >
              <h3>{val.symbol}</h3>
              <p>{val[renderType.render1]}</p>
              {
                <p>
                  {parseInt(val[renderType.render2], 10) < 0 && '-'}
                  {perFormatter(Math.abs(val[renderType.render2]))}
                </p>
              }
            </Item>
          );
        })}
      </MapList>
    </>
  );
}

const MapList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 0.5em;
  background-color: ${(p) => p.theme.palette.white};
  padding: 1.3em;
  border-radius: ${(p) => p.theme.style.borderRadius};
`;

const Item = styled.div<{ per: number; negative: boolean }>`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  align-items: center;
  background-color: ${(p) =>
    p.negative
      ? p.per === 100
        ? 'rgb(232, 18, 36)'
        : `rgba(232, 18, 36, .${Math.abs(p.per) > 10 ? Math.abs(p.per) : 1})`
      : p.per === 100
      ? 'rgb(0, 162, 91)'
      : `rgba(0, 162, 91, .${p.per > 10 ? p.per : 1})`};

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    /* margin: 0.3em 0; */
    font-size: 0.8rem;
  }
`;
