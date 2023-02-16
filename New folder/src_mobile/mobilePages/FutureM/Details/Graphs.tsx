import { useCallback, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import styled from 'styled-components';

import { Theme } from 'constants/theme';
import { chartData, chartInt, commonObject } from 'interfaces';
import { createChart, floatFormatter } from 'functions';
import { ChartNoData, Graph } from 'styles/common';

const CHARTS = [
  {
    title: 'Future Prices',
    key: 'others',
    valueOf: 'close',
    display: 'expiration_date',
    format: true,
  },
  {
    title: 'Discount/Premium',
    key: 'others',
    valueOf: 'premium',
    display: 'expiration_date',
    format: true,
  },
  {
    title: 'Active CALLS',
    key: 'activeCall',
    valueOf: 'contracts',
    display: 'strike',
    format: false,
  },
  {
    title: 'ACTIVE PUTS',
    key: 'putCall',
    valueOf: 'contracts',
    display: 'strike',
    format: false,
  },
];

export default function Graphs({ data, expiryDate }: { data: commonObject; expiryDate: string }) {
  const [charts, setCharts] = useState<chartInt[]>([]);

  const updateData = () => {
    if (Object.keys(data).length) {
      const arr: chartData[] = CHARTS.map(
        (chart) =>
          ({
            title: chart.title,
            color: chart.key === 'others' && data[chart.key]['discount'] === 0 ? Theme.palette.danger : Theme.palette.primary,
            data: data[chart.key].map((val: commonObject) => {
              const reqVal = chart.key === 'others' && data[chart.key]['discount'] === 0 ? data[chart.key]['discount'] : val[chart.valueOf];
              return {
                name: chart.key === 'others' ? val[chart.display] : `${expiryDate} (${val[chart.display]})`,
                value: chart.format ? Number(floatFormatter(reqVal)) : reqVal,
              };
            }),
          } as chartData),
      );

      setCharts(
        arr.map(
          (val) =>
            ({
              text: val.title,
              chart: createChart(val),
            } as chartInt),
        ),
      );
    }
  };

  const memoizedUpdateData = useCallback(updateData, [data, expiryDate]);

  useEffect(() => {
    memoizedUpdateData();
  }, [memoizedUpdateData]);

  return (
    <>
      <GraphContainer>
        {charts.map((ch, ind) => {
          return (
            <Graph key={ind} style={{ width: 'auto' }}>
              <div className="top">
                <h3>{ch.text}</h3>
              </div>
              {ch.chart?.series[0]?.data?.length > 0 ? (
                <ReactECharts option={ch.chart} style={{ height: '150px' }} opts={{ renderer: 'svg' }} />
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

export const GraphContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
