import axios from 'axios';
import ReactECharts from 'echarts-for-react';
import { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';
import { Loader } from '../../../components';
import { customAxiosError, ISkewData } from '../../../interfaces';
import { useAppSelector } from '../../../redux/hooks';

export default function Graphs() {
  const [loading, setLoading] = useState(false);
  const [skewData, setSkewData] = useState<ISkewData>();

  const activeStock = useAppSelector((state) => state.global.stock.value);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);

  const getSkewData = async () => {
    if (!expiryOption.value) return;

    setLoading(true);

    try {
      const { data } = await axios.get(`/v1/api/charts/skew/${activeStock.value}?expiry_date=${expiryOption.value}`);

      setSkewData(data);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    } finally {
      setLoading(false);
    }
  };

  if (skewData) {
    console.log(Object.keys(skewData.skew_data).length);

    console.log(Object.values(skewData.skew_data).map((skew) => skew.filter((s) => s.option_type === 'CE')?.[0]?.iv).length);
  }

  const option = {
    title: {
      text: 'Skew',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Call IV', 'Put IV'],
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 0,
        end: 100,
        handleSize: 8,
      },
    ],
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        saveAsImage: { show: true },

        dataZoom: {
          yAxisIndex: false,
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        data: skewData && Object.keys(skewData.skew_data),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Call IV',
        type: 'line',
        data: skewData && Object.values(skewData.skew_data).map((skew) => skew.filter((s) => s.option_type === 'CE')?.[0]?.iv.toFixed(4)),
        itemStyle: { normal: { color: '#008080' } },
        barGap: '0%',
      },
      {
        name: 'Put IV',
        type: 'line',
        data: skewData && Object.values(skewData.skew_data).map((skew) => skew.filter((s) => s.option_type === 'PE')?.[0]?.iv.toFixed(4)),
        barGap: '0%',
        itemStyle: { normal: { color: '#F56D91' } },
      },
    ],
  };

  const memoizedGetData = useCallback(getSkewData, [activeStock.value, expiryOption.value]);

  useEffect(() => {
    memoizedGetData();
  }, [memoizedGetData]);

  return (
    <Container>{loading ? <Loader /> : <ReactECharts option={option} style={{ height: '600px' }} opts={{ renderer: 'svg' }} />}</Container>
  );
}

const Container = styled.div`
  margin: 4rem;
`;
