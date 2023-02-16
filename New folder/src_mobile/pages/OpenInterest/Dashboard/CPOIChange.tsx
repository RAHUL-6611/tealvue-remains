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

export default function CPOIChange() {
  const [oiData, setOiData] = useState<OIGraphInt>({
    oi_data: [],
    atm_strike: 0,
    symbol: '',
  });
  const [loading, setLoading] = useState(true);

  const expiryOption = useAppSelector((state) => state.expiryDates.activeOption);
  const activeStock = useAppSelector((state) => state.global.stock.value);

  useEffect(() => {
    const getOIData = async () => {
      if (!activeStock.value || !expiryOption.value) return;

      try {
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

  const OILTPChartOption = {
    title: {
      text: 'Call vs Put',
    },
    tooltip: {
      trigger: 'axis',
    },

    legend: {
      data: ['Call OI Change', 'Put OI Change'],
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
        name: 'Call OI Change',
        type: 'bar',
        data: oiData.oi_data && oiData.oi_data.map((ltp) => ltp.call_chg_oi),
        barGap: '0%',
        itemStyle: { normal: { color: '#008080' } },
      },
      {
        name: 'Put OI Change',
        type: 'bar',
        data: oiData.oi_data && oiData.oi_data.map((ltp) => ltp.put_chg_oi),
        barGap: '0%',
        itemStyle: { normal: { color: '#F56D91' } },
      },
    ],
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="pt-8">
      <ReactECharts option={OILTPChartOption} style={{ height: '600px' }} opts={{ renderer: 'svg' }} />
    </div>
  );
}
