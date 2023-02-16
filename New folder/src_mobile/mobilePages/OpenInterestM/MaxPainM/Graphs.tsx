import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { useAppSelector } from 'redux/hooks';
import { customAxiosError, MaxPainData, selectItemProps } from 'interfaces';
import { Loader } from 'components';

export default function Graphs() {
  const [, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const [loading, setLoading] = useState(true);
  const [maxPainData, setMaxPainData] = useState<MaxPainData>();

  const {
    value: { value },
  } = useAppSelector((state) => state.global.stock);
  const expiryDates = useAppSelector((state) => state.expiryDates.future);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);

  const getData = async (expiry_at: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/v1/api/charts/maxpain/${value}?date=${expiry_at}`);
      setMaxPainData(data);
      setLoading(false);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    }
  };

  useEffect(() => {
    if (expiryDates.length) {
      setExpiryOptions(
        expiryDates.map((data) => ({
          value: data,
          label: data,
        })),
      );
    }
  }, [expiryDates]);

  const memoizedGetData = useCallback(getData, [value]);

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData(expiryOption.value);
    }
  }, [memoizedGetData, expiryOption]);

  const options: Highcharts.Options = {
    rangeSelector: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Poppins',
      },
      zoomType: 'x',
    },
    xAxis: {
      tickInterval: 500,
      plotLines: [
        {
          color: 'black',
          width: 2,
          value: maxPainData ? maxPainData.maxpain_strike : 0,
          zIndex: 4,
          dashStyle: 'Dash',
          label: {
            text: `Max Pain Strike ${maxPainData && maxPainData.maxpain_strike}`,
            rotation: 0,
            textAlign: 'center',
            style: {
              fontWeight: 'bold',
            },
          },
        },
      ],
      labels: {
        formatter: function () {
          return this.value.toString();
        },
      },
    },
    yAxis: {
      opposite: false,
      title: {
        text: 'Max Pain',
        style: {
          fontWeight: 'bold',
        },
      },
    },
    tooltip: {
      formatter: function () {
        if (this.points)
          return this.points.reduce(function (s, point) {
            return s + '<br />' + point.series.name + ': <b>' + point.y.toFixed(2) + '</b>';
          }, 'Strike: <b>' + this.x + '</b>');
      },
      shared: true,
    },
    plotOptions: {
      column: {
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        grouping: false,
      },
    },
    series: [
      {
        name: 'Max Pain Put',
        type: 'column',
        data: maxPainData ? Object.values(maxPainData.put_data).map((val) => [val.strike, val.cum_put]) : [],
        color: '#A367DC',
      },
      {
        name: 'Max Pain Call',
        type: 'column',
        data: maxPainData ? Object.values(maxPainData.call_data).map((val) => [val.strike, val.cum_call]) : [],
        color: '#A367DC',
      },
    ],
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <Container>
      {loading ? <Loader /> : <HighchartsReact highcharts={Highcharts} options={options} constructorType={'stockChart'} />}
    </Container>
  );
}

const Container = styled.div`
  margin: 4rem;
`;
