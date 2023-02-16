import { useCallback, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Theme } from 'constants/theme';
import { Loader } from 'components';
import { chartData, chartInt, customAxiosError, commonObject, dashboardGraphProps } from 'interfaces';
import { createChart, floatFormatter } from 'functions';
import { ChartNoData, Graph, GraphContainer } from 'styles/common';

const CHARTS = [
  {
    title: 'Most Active by Contract (Calls)',
    color: Theme.palette.primary,
    key: 'active_contracts_call',
    valueOf: 'volume',
    screener: 'active_value_calls',
    format: false,
  },
  {
    title: 'Most Active by Contract (Puts)',
    color: Theme.palette.primary,
    key: 'active_contracts_put',
    valueOf: 'volume',
    screener: 'active_value_puts',
    format: false,
  },
  {
    title: '% CONTRACT GAINERS(Calls)',
    color: Theme.palette.primary,
    key: 'contract_gainers_call',
    valueOf: 'volume_change',
    screener: 'contract_gainer_calls',
    format: true,
  },
  {
    title: '% CONTRACT GAINERS(Puts)',
    color: Theme.palette.primary,
    key: 'contract_gainers_put',
    valueOf: 'volume_change',
    screener: 'contract_gainer_puts',
    format: true,
  },
  {
    title: '% OI GAINER(Calls)',
    color: Theme.palette.primary,
    key: 'oi_gainer_call',
    valueOf: 'oi_change',
    screener: 'oi_gainer_calls',
    format: true,
  },
  {
    title: '% OI GAINER(Puts)',
    color: Theme.palette.primary,
    key: 'oi_gainer_put',
    valueOf: 'oi_change',
    screener: 'oi_gainer_puts',
    format: true,
  },
  {
    title: '% OI LOSERS(Calls) ',
    color: Theme.palette.danger,
    key: 'oi_loser_call',
    valueOf: 'oi_change',
    screener: 'oi_loser_calls',
    format: true,
  },
  {
    title: '% OI Losers(Puts)',
    color: Theme.palette.danger,
    key: 'oi_loser_put',
    valueOf: 'oi_change',
    screener: 'oi_loser_puts',
    format: true,
  },
];

export default function Graphs({ expiryOption }: dashboardGraphProps) {
  const [loading, setLoading] = useState(true);
  const [charts, setCharts] = useState<chartInt[]>([]);
  const history = useHistory();

  const getData = async (expiry_at: string) => {
    setLoading(true);
    try {
      const payload: commonObject = {
        type: 'OPTION',
        range: {
          start: 0,
          end: 5,
        },
      };
      if (expiry_at) payload.expiry_at = expiry_at;
      const { data } = await axios.post('v1/api/overview', payload);

      const arr: chartData[] = CHARTS.map(
        (chart) =>
          ({
            type: 'option',
            title: chart.title,
            color: chart.color,
            screener: chart.screener,
            data: data.data[chart.key]
              .map((val: commonObject) => ({
                name: `${val.symbol} ${val.strike}`,
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
      <GraphContainer>
        {charts.map((ch, ind) => {
          return (
            <Graph key={ind}>
              <div className="top">
                <h3>{ch.text}</h3>
                <span className="icon-arrow-right" onClick={() => history.push('/option/screener', { active: ch.screener ?? '' })} />
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
