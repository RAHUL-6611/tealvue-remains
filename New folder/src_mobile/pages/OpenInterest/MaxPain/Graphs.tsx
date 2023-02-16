import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import { GroupBase, OptionsOrGroups } from 'react-select';

import { useAppSelector } from 'redux/hooks';
import { customAxiosError, MaxPainData, selectItemProps } from 'interfaces';
import { Loader } from 'components';

export default function Graphs() {
  const [, setExpiryOptions] = useState<OptionsOrGroups<selectItemProps, GroupBase<selectItemProps>>>([]);
  const [loading, setLoading] = useState(true);
  const [maxPainData, setMaxPainData] = useState<MaxPainData>();

  const activeStock = useAppSelector((state) => state.global.stock.value);

  const expiryDates = useAppSelector((state) => state.expiryDates.option);
  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/v1/api/charts/maxpain/${activeStock.value}?date=${expiryOption.value}`);

      console.log('data ', data);

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

  const memoizedGetData = useCallback(getData, [activeStock.value, expiryOption.value]);

  useEffect(() => {
    if (expiryOption.value) {
      memoizedGetData();
    }
  }, [memoizedGetData, expiryOption]);

  const options = {
    title: {
      text: 'Call vs Put',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['CP', 'PP'],
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: maxPainData && maxPainData.call_data.map((cm) => cm.strike),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'CP',
        type: 'bar',
        data: maxPainData && maxPainData.call_data.map((cm) => cm.cum_call),
        barGap: '0%',
        itemStyle: { normal: { color: '#F56D91' } },
        markLine: {
          data: [
            {
              name: 'Maxpain',
              xAxis: `${maxPainData?.maxpain_strike}`,
              label: {
                formatter: '{b} {c}',
              },
            },
          ],
        },
      },
      {
        name: 'PP',
        type: 'bar',
        data: maxPainData && maxPainData.put_data.map((cm) => cm.cum_put),
        barGap: '0%',
        itemStyle: { normal: { color: '#008080' } },
      },
    ],
  };

  return (
    <Container>{loading ? <Loader /> : <ReactECharts option={options} style={{ height: '600px' }} opts={{ renderer: 'svg' }} />}</Container>
  );
}

const Container = styled.div`
  margin: 4rem;
`;
