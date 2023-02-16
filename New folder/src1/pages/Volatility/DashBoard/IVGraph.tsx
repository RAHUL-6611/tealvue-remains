import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

import { customAxiosError, ivChartInt } from 'interfaces';
import { Loader } from 'components';

const upColor = '#00da3c';
const downColor = '#ec0000';

export default function IVGraph() {
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState<ivChartInt>();

  const activeStock = useAppSelector((state) => state.global.stock.value);

  const getData = async () => {
    try {
      setLoading(true);

      // Need to change the type to FUTURE
      const { data } = await axios.get(`/v1/api/charts/ivchart/${activeStock.value}?type=FUTURE`);

      setChartData(data);
    } catch (error) {
      const err = error as customAxiosError;
      err.handleGlobally && err.handleGlobally();
    } finally {
      setLoading(false);
    }
  };

  const memoizedGetData = useCallback(getData, [activeStock.value]);

  useEffect(() => {
    memoizedGetData();
  }, [memoizedGetData]);

  const options = {
    legend: {
      bottom: 10,
      left: 'center',
      data: [activeStock.label, 'ATM IV'],
    },
    xAxis: {
      data: chartData?.ohlc_data.map((o) => o.trade_date),
    },
    yAxis: [
      {
        type: 'value',
        name: 'Strike Price',

        scale: true,
      },
      {
        type: 'value',
        name: 'ATM IV',
      },
    ],
    series: [
      {
        name: activeStock.label,
        type: 'candlestick',
        data: chartData?.ohlc_data.map((o) => [...o.y]),
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: undefined,
          borderColor0: undefined,
        },
      },
      {
        name: 'ATM IV',
        type: 'line',
        yAxisIndex: 1,
        data: chartData?.ohlc_data.map((o) => o.iv),
      },
    ],

    toolbox: {
      feature: {
        saveAsImage: { show: true },

        dataZoom: {
          yAxisIndex: false,
        },
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      position: function (pos: any, params: any, el: any, elRect: any, size: any) {
        var obj: Record<string, number> = { top: 10 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
    },
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="border border-gray-400 rounded-md border-opacity-50">
          <ReactECharts option={options} style={{ height: '600px' }} opts={{ renderer: 'svg' }} />
        </div>
      )}
    </>
  );
}
