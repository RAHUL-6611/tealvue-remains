import { useCallback, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Theme } from 'constants/theme';
import { Loader } from 'components';
import { chartData, chartInt, customAxiosError, commonObject, screenerLocation } from 'interfaces';
import { createChart, floatFormatter } from 'functions';
import { ChartNoData, Graph, GraphContainer } from 'styles/common';
import { useAppSelector } from '../../../redux/hooks';

const CHARTS = [
  {
    title: '% PRICE GAINERS',
    color: Theme.palette.primary,
    key: 'price_gainers',
    valueOf: 'price_change',
    screener: 'day_change',
    format: true,
  },
  {
    title: '% PRICE LOSERS',
    color: Theme.palette.danger,
    key: 'price_losers',
    valueOf: 'price_change',
    screener: 'day_change',
    format: true,
  },
  {
    title: '% CONTRACT GAINERS',
    color: Theme.palette.primary,
    key: 'contract_gainers',
    valueOf: 'volume_change',
    screener: 'volume_change',
    format: true,
  },
  {
    title: 'ACTIVE CONTRACT',
    color: Theme.palette.primary,
    key: 'active_contracts',
    valueOf: 'volume',
    screener: 'volume',
    format: false,
  },
  {
    title: '% OI GAINER',
    color: Theme.palette.primary,
    key: 'oi_gainers',
    valueOf: 'oi_change',
    screener: 'oi_change',
    format: true,
  },
  {
    title: '% OI LOSERS',
    color: Theme.palette.danger,
    key: 'oi_losers',
    valueOf: 'oi_change',
    screener: 'oi_change',
    format: true,
  },
  {
    title: '% PREMIUM',
    color: Theme.palette.primary,
    key: 'premiums',
    valueOf: 'premium',
    screener: 'basis',
    format: true,
  },
  {
    title: '% DISCOUNT',
    color: Theme.palette.danger,
    key: 'discounts',
    valueOf: 'discount',
    screener: 'basis',
    format: true,
  },
];

export default function Graphs() {
  const [loading, setLoading] = useState(true);
  const [charts, setCharts] = useState<chartInt[]>([]);
  const history = useHistory<screenerLocation>();
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);

  const getData = async (expiry_at: string) => {
    setLoading(true);
    try {
      const payload: commonObject = {
        type: 'FUTURE',
        expiry_at,
        range: {
          start: 0,
          end: 5,
        },
      };
      const { data } = await axios.post('v1/api/overview', payload);


      const arr: chartData[] = CHARTS.map(
        (chart) =>
          ({
            type: 'future',
            title: chart.title,
            color: chart.color,
            screener: chart.screener,
            data: data.data[chart.key]
              .map((val: commonObject) => ({
                name: val.symbol,
                value: chart.format ? Number(floatFormatter(Math.abs(Number(val[chart.valueOf])))) : Math.abs(Number(val[chart.valueOf])),
              }))
              .sort(
                (
                  a: {
                    name: string;
                    value: number;
                  },
                  b: {
                    name: string;
                    value: number;
                  },
                ) => parseFloat(`${a?.value}`) - parseFloat(`${b?.value}`),
              ),
          } as chartData),
      );

      console.log('arr ', arr);

      setCharts(
        arr.map(
          (val) =>
            ({
              text: val.title,
              chart: createChart(val),
              screener: val.screener,
            } as chartInt),
        ),
      );

      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  const memoizedGetData = useCallback(getData, []);

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData(expiryOption.value);
    }
  }, [memoizedGetData, expiryOption]);

  return (
    <>
      {loading && <Loader />}

      <GraphContainer className="max-h-screen overflow-scroll no-scrollbar">
        {charts.map((ch, ind) => {
          return (
            <Graph key={ind}>
              <div className="top">
                <h3>{ch.text}</h3>
                <span className="icon-arrow-right" onClick={() => history.push('/future/screener', { active: ch.screener ?? '' })} />
              </div>

              {ch.chart?.series[0]?.data?.length > 0 ? (
                <ReactECharts option={ch.chart} style={{ height: '250px' }} opts={{ renderer: 'svg' }} />
              ) : (
                <ChartNoData>
                  <h2>No data found</h2>
                </ChartNoData>
              )}
            </Graph>
          );
        })}
      </GraphContainer>
    </>
  );
}
