import { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighChartsReact from 'highcharts-react-official';
import styled from 'styled-components';

import { Loader } from 'components';
import { line_data, ohlc_data } from './data';

export default function HVGraph() {
  const [loading, setLoading] = useState(true);

  const options: Highcharts.Options = {
    rangeSelector: {
      enabled: true,
    },
    scrollbar: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    yAxis: [
      {
        title: { text: 'HV' },
        opposite: false,
      },
      {
        title: { text: 'NIFTY' },
      },
    ],
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Poppins',
      },
      zoomType: 'y',
    },
    plotOptions: {
      candlestick: {
        color: '#EDACAF',
        upColor: '#B6DAC5',
        lineWidth: 2,
        lineColor: '#DB5960',
        upLineColor: '#71B88F',
      },
    },
    series: [
      {
        type: 'candlestick',
        name: 'NIFTY',
        data: ohlc_data,
        yAxis: 1,
        dataGrouping: {
          units: [
            [
              'week', // unit name
              [1], // allowed multiples
            ],
            ['month', [1, 2, 3, 4, 6]],
          ],
        },
        marker: {
          enabled: false,
        },
        shadow: true,
      },
      {
        type: 'line',
        name: 'HV',
        data: line_data,
        yAxis: 0,
        tooltip: {
          valueDecimals: 2,
        },
        color: 'orange',
        marker: {
          enabled: false,
        },
      },
    ],
    legend: {
      enabled: true,
      floating: true,
      verticalAlign: 'top',
    },
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <HighChartsReact highcharts={Highcharts} options={options} constructorType={'stockChart'} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  margin: 4rem;
`;
