import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

import { Loader } from 'components';
import { customAxiosError, OIData } from 'interfaces';
import { useAppSelector } from 'redux/hooks';

interface OIGraphInt {
  oi_data: OIData[];
  atm_strike: number;
  symbol: string;
}

export default function CPOI() {
  const [oiData, setOiData] = useState<OIGraphInt>({
    oi_data: [],
    atm_strike: 0,
    symbol: '',
  });
  const [loading, setLoading] = useState(true);

  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const activeStock = useAppSelector((state) => state.global.stock.value);

  // const memoizedGetOIData = useCallback(getOIData, [activeStock.value, expiryOption.value]);

  const OILTPChartOption = {
    title: {
      text: 'Call OI vs Put OI',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Call OI', 'Put OI'],
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 30,
        end: 60,
        handleSize: 8,
      },
      {
        type: 'inside',
        start: 30,
        end: 60,
      },
      {
        type: 'slider',
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 0.5,
        height: '70%',
        handleSize: 8,
        showDataShadow: false,
        left: '93%',
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
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: oiData.oi_data && oiData.oi_data.map((ltp) => ltp.strike),
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: { onZero: false },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100,
        },
      },
    ],
    series: [
      {
        name: 'Call OI',
        type: 'bar',
        data: oiData.oi_data && oiData.oi_data.map((ltp) => ltp.call_oi),
        itemStyle: { normal: { color: '#008080' } },
        barGap: '0%',
      },
      {
        name: 'Put OI',
        type: 'bar',
        data: oiData.oi_data && oiData.oi_data.map((ltp) => ltp.put_oi),
        barGap: '0%',
        itemStyle: { normal: { color: '#F56D91' } },
      },
    ],
  };

  useEffect(() => {
    const getOIData = async () => {
      try {
        console.log('api called ', activeStock.value, expiryOption.value);
        if (!activeStock.value || !expiryOption.value) return;

        const { data } = await axios.get(`/v1/api/charts/oichart/${activeStock.value}?date=${expiryOption.value}`);
        setOiData(data);
        setLoading(false);
      } catch (error) {
        const err = error as customAxiosError;
        err.handleGlobally && err.handleGlobally();
      }
    };

    getOIData();
  }, [activeStock.value, expiryOption.value]);

  return loading ? (
    <Loader />
  ) : (
    <div className="pt-8">
      <ReactECharts option={OILTPChartOption} style={{ height: '600px' }} opts={{ renderer: 'svg' }} />
    </div>
  );
}
