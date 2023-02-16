import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { GroupBase, OptionsOrGroups } from 'react-select';
import ReactECharts from 'echarts-for-react';
import { Loader } from 'components';
import { BuildupData, customAxiosError, selectItemProps } from 'interfaces';
import { useAppSelector } from 'redux/hooks';

export default function OIBuildup() {
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

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    legend: {
      data: ['Call', 'Put'],
      itemGap: 15,
    },
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      data: buildupData?.oi_buildupdata.map((bup, i) => bup.strike.toString()),
    },
    yAxis: {
      type: 'value',
    },
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 2,
      },
      {
        type: 'inside',
        start: 0,
        end: 2,
      },
      {
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        // width: 30,
        // height: '80%',
        // showDataShadow: false,
        left: '93%',
      },
    ],
    series: [
      {
        name: 'Call',
        type: 'bar',
        data: buildupData?.oi_buildupdata?.map((bup, i) => bup?.call.oi),
        
      },
      {
        name: 'Put',
        type: 'bar',
        data: buildupData?.oi_buildupdata?.map((bup, i) => bup?.put.oi),
      },
    ],
  };
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ReactECharts option={options} />
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
