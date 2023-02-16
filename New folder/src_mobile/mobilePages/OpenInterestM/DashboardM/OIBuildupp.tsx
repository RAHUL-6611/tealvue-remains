import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighStock from 'highcharts/highstock';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { Loader } from 'components';
import { BuildupData, customAxiosError, selectItemProps } from 'interfaces';
import { useAppSelector } from 'redux/hooks';

export default function OIBuildupp() {
  const [loading, setLoading] = useState(false);
  const [buildupData, setBuildupData] = useState<BuildupData>();

  const [, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);

  const {
    value: { value },
  } = useAppSelector((state) => state.global.stock);
  const expiryDates = useAppSelector((state) => state.expiryDates.future);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeFuture);

  const getData = async (expiry_at: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/v1/api/charts/oibuild/${value}?date=${expiry_at}`);
        setBuildupData(data);
        setLoading(false);
    } catch (error) {
        const err = error as customAxiosError;
        err.handleGlobally && err.handleGlobally();
    }
};

  console.log(buildupData?.oi_buildupdata.map((bup, i) => bup.strike.toString()));
// console.log(  buildupData?.oi_buildupdata?.map((bup, i) => bup?.put.oi));
  const returnColor = (value: string) => {
    return value === 'LBU' ? '#23BC01' : value === 'LU' ? '#01779B' : value === 'SBU' ? '#C1011A' : value === 'SC' ? '#828F1D' : '#919191';
  };

  const colors = [
    ['LBU', '#23BC01'],
    ['LU', '#01779B'],
    ['SBU', '#C1011A'],
    ['SC', '#828F1D'],
    ['N', '#919191'],
  ];

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
    scrollbar: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Poppins',
      },
      zoomType: 'xy',
    },
    xAxis: [
      {
        categories: buildupData?.oi_buildupdata?.map((data) => data.strike.toString()),
        tickInterval: 100,
        labels: {
          formatter: function () {
            return this.value.toString();
          },
        },
      },
    ],
    yAxis: {
      opposite: false,
      title: {
        text: '',
      },
      labels: {
        formatter: function () {
          return this.value ? Math.abs(Number(this.value)).toString() : '';
        },
      },
    },
    tooltip: {
      formatter: function () {
        if (this.points)
          return this.points.reduce(function (s, point) {
            return s + '<br/>' + point.series.name + ': <b>' + point.y + '</b>';
          }, '<b>' + this.x + '</b>');
      },
      shared: true,
    },
    plotOptions: {
      column: {
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Call',
        type: 'column',
        data: buildupData
          ? Object.values(buildupData.oi_buildupdata).map((val) => ({
              x: val.strike,
              y: val.call.oi,
              color: returnColor(val.call.buildup),
            }))
          : [],
      },
      {
        name: 'Put',
        type: 'column',
        data: buildupData
          ? Object.values(buildupData.oi_buildupdata).map((val) => ({
              x: val.strike,
              y: val.put.oi,
              color: returnColor(val.put.buildup),
            }))
          : [],
      },
    ],
    legend: {
      enabled: true,
    },
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ColorLegendContainer>
            {colors.map((val, ind) => (
              <ColorLegend key={ind}>
                <h1>{val[0]}</h1>
                <div className="colorIndicator" style={{ backgroundColor: `${val[1]}` }}>
                  &nbsp;
                </div>
              </ColorLegend>
            ))}
          </ColorLegendContainer>
          <HighchartsReact highcharts={HighStock} options={options} constructorType={'stockChart'} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 4rem;
`;

const ColorLegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ColorLegend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.5rem;
  }

  .colorIndicator {
    width: 1.5rem;
    margin: 0 1rem;
  }
`;
